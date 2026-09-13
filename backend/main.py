from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from typing import Any, Dict, List, Optional
import os

import models as catalogue

load_dotenv()

# This is an OpenRouter key, so OPENROUTER_API_KEY is the honest name and the
# one to prefer. OPENAI_API_KEY is still read second, because that is what
# earlier .env files here used and breaking them would be rude.
API_KEY = os.getenv("OPENROUTER_API_KEY") or os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=API_KEY,
)

EXTRA_HEADERS = {
    "HTTP-Referer": "https://mindmentor.ai",
    "X-Title": "MindMentor",
}


def _usage(completion: Any, model: "catalogue.Model") -> Dict[str, Any]:
    """What the call cost, as OpenRouter reported it.

    OpenRouter returns `cost` in USD on every response without being asked,
    so this is the charge rather than an estimate. `reasoning_tokens` is the
    part billed at the completion rate that never reaches the reader, which
    is the one line that explains a surprising bill on a reasoning model.
    """
    raw = getattr(completion, "usage", None)
    if raw is None:
        return {"model": model.model_id}
    details = getattr(raw, "completion_tokens_details", None)
    reasoning = None
    if details is not None:
        reasoning = (
            details.get("reasoning_tokens")
            if isinstance(details, dict)
            else getattr(details, "reasoning_tokens", None)
        )
    return {
        "model": model.model_id,
        "prompt_tokens": getattr(raw, "prompt_tokens", None),
        "completion_tokens": getattr(raw, "completion_tokens", None),
        "reasoning_tokens": reasoning,
        "total_tokens": getattr(raw, "total_tokens", None),
        "cost": getattr(raw, "cost", None),
    }

class Message(BaseModel):
    role: str  # 'user' or 'assistant'
    content: str

class ChatRequest(BaseModel):
    message: str
    model: str
    history: Optional[List[Message]] = []

class PromptRequest(BaseModel):
    prompt: str
    model: str


# System prompt that gives the AI context about being a tutor
SYSTEM_PROMPT = """You are MindMentor, an expert AI tutor designed to help students learn any topic effectively. Your role is to:

1. **Be Comprehensive**: Provide detailed, thorough explanations without requiring follow-up questions
2. **Be Clear**: Break down complex topics into understandable parts
3. **Be Structured**: Organize your responses with clear sections, numbered points, and examples
4. **Be Pedagogical**: Use analogies, examples, and step-by-step explanations
5. **Anticipate Questions**: Address potential follow-up questions in your initial response
6. **Be Encouraging**: Maintain a supportive and motivating tone

When answering:
- Start with a brief overview
- Explain core concepts in detail
- Provide practical examples
- Include visual descriptions where helpful (since you can't show images)
- Offer study tips or common pitfalls
- End with a summary or key takeaways

Remember: The user can't easily ask follow-ups, so make your response as complete as possible on the first try."""


@app.post("/chat")
def chat(request: ChatRequest):
    """
    Main chat endpoint with conversation history support and automatic fallback
    """
    # Build message history with system prompt
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    
    # Add conversation history
    for msg in request.history:
        messages.append({"role": msg.role, "content": msg.content})
    
    # Add current user message
    messages.append({"role": "user", "content": request.message})
    
    requested = catalogue.resolve(request.model)
    chain = catalogue.fallback_chain(requested)

    last_error = None

    for model in chain:
        try:
            completion = client.chat.completions.create(
                extra_headers=EXTRA_HEADERS,
                model=model.model_id,
                messages=messages,
                temperature=catalogue.TEMPERATURE,
                max_tokens=catalogue.MAX_TOKENS,
            )

            usage = _usage(completion, model)
            return {
                "model_used": model.name,
                "response": completion.choices[0].message.content,
                "status": "success",
                "tokens_used": usage.get("total_tokens"),
                "fallback_used": model.model_id != requested.model_id,
                "usage": usage,
            }

        except Exception as e:
            last_error = str(e)
            # Only a rate limit or an upstream fault is worth another model.
            # A malformed request fails identically on every one of them, and
            # on paid models each retry is another charge.
            if not catalogue.is_retryable(e):
                raise HTTPException(status_code=502, detail=f"{model.name}: {e}") from e
            continue

    # All models failed
    raise HTTPException(
        status_code=503, 
        detail=f"All AI models are currently unavailable. Last error: {last_error}"
    )


@app.post("/generate")
def generate(request: PromptRequest):
    """
    Legacy endpoint for backward compatibility
    """
    try:
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": request.prompt}
        ]
        
        model = catalogue.resolve(request.model)
        completion = client.chat.completions.create(
            extra_headers=EXTRA_HEADERS,
            model=model.model_id,
            messages=messages,
            temperature=catalogue.TEMPERATURE,
            max_tokens=catalogue.MAX_TOKENS,
        )
        return {
            "model_used": model.name,
            "response": completion.choices[0].message.content,
            "status": "success",
            "usage": _usage(completion, model),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "service": "MindMentor API"}


@app.get("/models")
def get_models():
    """The models the UI may offer, free ones first."""
    return {
        "models": [
            {
                "name": m.name,
                "description": m.description,
                "provider": m.provider,
                "tier": m.tier,
            }
            for m in catalogue.CATALOGUE
        ],
        "default": catalogue.DEFAULT_NAME,
    }
