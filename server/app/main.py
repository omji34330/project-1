from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",  # Allow frontend to access the backend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the chat route
app.include_router(chat.router)

@app.get("/")
async def root():
    return {"message": "Welcome to EcoGrid AI Backend"}