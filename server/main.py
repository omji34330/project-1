"""
EcoGrid AI — FastAPI backend

Exposes a single POST /api/chat endpoint that proxies conversations to
Google Gemini 2.5 Flash. The Gemini API key lives only in this server's
environment (see .env.example) and is never returned to, or readable by,
the frontend — the browser only ever talks to this backend.

Run locally with:
    uvicorn main:app --reload --port 8000
"""

import logging
import os
from typing import List, Literal, Optional

import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ecogrid-ai")

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_MODEL_NAME = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
ALLOWED_ORIGIN = os.environ.get("FRONTEND_ORIGIN", "http://localhost:5173")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    logger.warning(
        "GEMINI_API_KEY is not set. /api/chat will return 500 until it is "
        "configured in the environment (see server/.env.example)."
    )

SYSTEM_PROMPT = """You are EcoGrid AI Assistant, the in-app helper for EcoGrid AI — an AI-powered
renewable energy monitoring and prediction platform built for Smart India Hackathon 2026
(Problem Statement 26200, Renewable / Sustainable Energy theme).

Help users understand:
- Solar energy generation, panel output, and how cloud cover / time of day affect it
- Wind energy potential and turbine power curves
- Battery health, state of charge (SOC), charging and discharging behaviour
- Carbon emissions, CO2 savings, and grid efficiency
- Practical ways to reduce electricity consumption

Keep answers concise, friendly, and easy to understand for a general audience. Use simple
analogies where helpful. If asked something entirely unrelated to energy, sustainability, or
the EcoGrid AI platform, briefly redirect the user back to those topics. Never claim to control
real hardware — the dashboard figures are estimates derived from live weather data."""

app = FastAPI(title="EcoGrid AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN],
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


class ChatHistoryItem(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    history: Optional[List[ChatHistoryItem]] = None


class ChatResponse(BaseModel):
    reply: str


def to_gemini_history(history: Optional[List[ChatHistoryItem]]) -> list:
    """Maps our {role: 'user' | 'assistant'} history into Gemini's expected
    {role: 'user' | 'model'} chat turn format."""
    if not history:
        return []
    return [
        {"role": "user" if item.role == "user" else "model", "parts": [item.content]}
        for item in history
    ]


@app.get("/api/health")
def health_check():
    return {"status": "ok", "gemini_configured": bool(GEMINI_API_KEY)}


@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY is not configured on the server.",
        )

    message = request.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="message must not be empty.")

    try:
        model = genai.GenerativeModel(
            model_name=GEMINI_MODEL_NAME,
            system_instruction=SYSTEM_PROMPT,
        )
        # Exclude the latest user turn from history — it is sent as the message itself.
        chat_history = to_gemini_history(request.history)[:-1] if request.history else []
        session = model.start_chat(history=chat_history)
        response = session.send_message(message)

        reply_text = (response.text or "").strip()
        if not reply_text:
            reply_text = "I couldn't generate a response for that — could you rephrase your question?"

        return ChatResponse(reply=reply_text)

    except Exception as exc:  # noqa: BLE001 — surface a safe, generic error to the client
        logger.exception("Gemini request failed: %s", exc)
        raise HTTPException(
            status_code=502,
            detail="EcoGrid AI Assistant is temporarily unavailable. Please try again shortly.",
        ) from exc


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
