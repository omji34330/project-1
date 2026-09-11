from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini import get_gemini_response
import os

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="API key not found.")
        
        response = await get_gemini_response(request.message, api_key)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))