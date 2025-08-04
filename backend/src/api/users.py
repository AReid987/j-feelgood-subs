from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated, AsyncSession
from sqlmodel import select
from jose import JWTError, jwt
from pydantic import BaseModel

from /home/user/jfeelgood/backend/app.models.user import User
from /home/user/jfeelgood/backend/app.core.config import settings # Assuming settings are in a config file
from /home/user/jfeelgood/backend/app.db.session import get_session # Assuming get_session is in a db session file

router = APIRouter()

async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: Annotated[AsyncSession, Depends(get_session)]
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        user = await session.exec(select(User).where(User.id == user_id)).first()
        if user is None:
            raise credentials_exception
        return user
    except JWTError:
        raise credentials_exception

@router.get("/api/v1/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    """
    Get the current authenticated user's information.
    """
    # Return user data, excluding the hashed password
    return {
        "id": current_user.id,
        "email": current_user.email,
        # Add other user fields you want to return
    }
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated

# Assuming you have an authentication dependency that verifies the JWT token
# and returns the user ID. Replace with your actual authentication logic.
async def get_current_user_id() -> int:
    # This is a placeholder. Implement your JWT verification and user ID retrieval here.
    # If authentication fails, raise HTTPException.
    return 1 # Simulate a logged-in user with ID 1

router = APIRouter()

@router.get("/api/v1/users/me")
async def read_users_me(current_user_id: Annotated[int, Depends(get_current_user_id)]):
    """
    Get the current authenticated user's information.
    """
    return {"user_id": current_user_id, "message": "Placeholder for user data"}
