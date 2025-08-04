from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import bcrypt
from typing import Annotated, AsyncSession
from pydantic import Field, EmailStr
from sqlmodel import create_engine, Session, select
from backend.app.models.user import User
import os
from dotenv import load_dotenv

router = APIRouter()

load_dotenv()
class UserRegistration(BaseModel):
    email: Annotated[EmailStr, Field(..., example="test@example.com")]
    password: Annotated[str, Field(..., example="SecurePassword123", min_length=8)]

async def create_user_in_db(email: str, hashed_password: bytes):
    """Placeholder function to simulate creating a user in the database."""
    print(f"Simulating database user creation for email: {email}")

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)

async def get_session() -> AsyncSession:
    async with Session(engine) as session:
        yield session

@router.post("/register")
async def register_user(user: UserRegistration, session: AsyncSession = Depends(get_session)):
    """
    Handles user registration.
    """
    existing_user = await session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(email=user.email, hashed_password=hashed_password)
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

