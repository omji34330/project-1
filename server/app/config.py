from pydantic import BaseSettings

class Settings(BaseSettings):
    # FastAPI application settings
    GEMINI_API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()