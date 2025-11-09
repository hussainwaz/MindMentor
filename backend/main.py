from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from typing import List, Optional
import os

load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")

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
    
    # Map model names to OpenRouter format (FREE MODELS ONLY)
    model_map = {
        "DeepSeek": "deepseek/deepseek-r1:free",
        "LLaMA": "meta-llama/llama-3.3-70b-instruct:free",
        "Minimax": "minimax/minimax-m2:free"
    }
    
    # Fallback order: try requested model first, then others
    models_to_try = [model_map.get(request.model, "deepseek/deepseek-r1:free")]
    for model in model_map.values():
        if model not in models_to_try:
            models_to_try.append(model)
    
    last_error = None
    
    for model in models_to_try:
        try:
            completion = client.chat.completions.create(
                extra_headers={
                    "HTTP-Referer": "https://mindmentor.ai",
                    "X-Title": "MindMentor",
                },
                model=model,
                messages=messages,
                temperature=0.7,
                max_tokens=1000,
            )
            
            response_content = completion.choices[0].message.content
            
            # Find the friendly name for the model that worked
            used_model_name = request.model
            for name, model_id in model_map.items():
                if model_id == model:
                    used_model_name = name
                    break
            
            return {
                "model_used": used_model_name,
                "response": response_content,
                "status": "success",
                "tokens_used": completion.usage.total_tokens if hasattr(completion, 'usage') else None,
                "fallback_used": model != models_to_try[0]
            }
            
        except Exception as e:
            last_error = str(e)
            # If rate limited or error, try next model
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
        
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "https://mindmentor.ai",
                "X-Title": "MindMentor",
            },
            model=request.model,
            messages=messages,
        )
        return {
            "model_used": request.model,
            "response": completion.choices[0].message.content,
            "status": "success",
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
    """
    Get available AI models (FREE ONLY)
    """
    return {
        "models": [
            {
                "name": "DeepSeek",
                "description": "Fast and efficient responses",
                "provider": "DeepSeek"
            },
            {
                "name": "LLaMA",
                "description": "Open-source, privacy-focused",
                "provider": "Meta"
            },
            {
                "name": "Minimax",
                "description": "Balanced performance and speed",
                "provider": "Minimax"
            }
        ]
    }
