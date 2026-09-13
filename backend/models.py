"""The model catalogue, and the rules for falling back between models.

The frontend talks in friendly names ("DeepSeek"); OpenRouter wants ids
("deepseek/deepseek-r1:free"). Keeping the mapping here means the request
body can never name a model that is not in this file, so the endpoint cannot
be used to bill arbitrary models against the key.
"""

import os
from dataclasses import dataclass
from typing import Dict, List, Optional


@dataclass(frozen=True)
class Model:
    name: str           # what the UI shows and sends back
    model_id: str       # what OpenRouter is asked for
    description: str
    provider: str
    tier: str           # free | cheap | mid | strong


CATALOGUE: List[Model] = [
    # Free tier stays first, and stays the default, so a clone with a fresh
    # key and no credit on it still works out of the box.
    Model("DeepSeek",    "deepseek/deepseek-r1:free",
          "Reasoning model, free tier", "DeepSeek", "free"),
    Model("LLaMA",       "meta-llama/llama-3.3-70b-instruct:free",
          "Open weights, free tier", "Meta", "free"),
    Model("Minimax",     "minimax/minimax-m2:free",
          "Balanced, free tier", "MiniMax", "free"),

    Model("Mistral Nemo", "mistralai/mistral-nemo",
          "Cheapest paid option, quick", "Mistral", "cheap"),
    Model("Qwen3 30B",    "qwen/qwen3-30b-a3b-instruct-2507",
          "Cheap, long context", "Alibaba", "cheap"),
    Model("Gemini Flash Lite", "google/gemini-2.5-flash-lite",
          "Cheap, very fast", "Google", "cheap"),

    Model("GPT-4o mini",  "openai/gpt-4o-mini",
          "Reliable general tutor", "OpenAI", "mid"),
    Model("DeepSeek V3.1", "deepseek/deepseek-chat-v3.1",
          "Strong explanations, mid price", "DeepSeek", "mid"),
    Model("Gemini Flash", "google/gemini-2.5-flash",
          "Fast with long context", "Google", "mid"),
    Model("GPT-5 mini",   "openai/gpt-5-mini",
          "Newer, good at structure", "OpenAI", "mid"),

    Model("Claude Haiku 4.5", "anthropic/claude-haiku-4.5",
          "Clear, well-organised answers", "Anthropic", "strong"),
    Model("Claude Sonnet 5",  "anthropic/claude-sonnet-5",
          "Best explanations, priciest", "Anthropic", "strong"),
    Model("GPT-5.1",          "openai/gpt-5.1",
          "Top-tier reasoning", "OpenAI", "strong"),
]

BY_NAME = {m.name: m for m in CATALOGUE}
DEFAULT_NAME = os.getenv("DEFAULT_MODEL_NAME", "DeepSeek")

TEMPERATURE = float(os.getenv("TEMPERATURE", "0.7"))
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "4000"))


def resolve(name: Optional[str]) -> Model:
    """Friendly name to Model, falling back to the default for unknown names."""
    return BY_NAME.get(name or "", BY_NAME[DEFAULT_NAME])


def fallback_chain(first: Model) -> List[Model]:
    """The requested model, then the free ones, as a safety net.

    Only free models are used as fallbacks. Silently retrying a paid request
    against other paid models would multiply the bill for one failure, and the
    person who picked Sonnet did not ask to be charged for GPT-5.1 as well.
    """
    chain = [first]
    chain += [m for m in CATALOGUE if m.tier == "free" and m.model_id != first.model_id]
    return chain


def is_retryable(exc: Exception) -> bool:
    """True only for rate limits, overload and transport faults.

    A 400 means the request itself is wrong: retrying it against three more
    models produces three more identical failures and three more charges.
    """
    status = getattr(exc, "status_code", None) or getattr(
        getattr(exc, "response", None), "status_code", None
    )
    if isinstance(status, int):
        return status == 408 or status == 409 or status == 429 or status >= 500
    # No status at all usually means the connection never completed.
    return any(
        word in type(exc).__name__.lower()
        for word in ("connection", "timeout", "apiconnection")
    )
