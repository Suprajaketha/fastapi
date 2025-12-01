import os
from dotenv import load_dotenv

load_dotenv()   # ⭐ this loads the .env file

class Settings:
    PROJECT_NAME: str = "My FastAPI Project"

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://postgres:supraja8@localhost:5432/fastapi_jwt"
    )

    JWT_SECRET: str = os.getenv("JWT_SECRET", "SUPER_SECRET_KEY")
    JWT_ALGORITHM: str = "HS256"

settings = Settings()
