from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship


class Subscription(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id", index=True)
    stripe_subscription_id: str = Field(unique=True, index=True)
    status: str
    stripe_price_id: str
    current_period_end: datetime

    user: "User" = Relationship(back_populates="subscriptions")
from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship


class Subscription(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id", index=True)
    stripe_subscription_id: str = Field(unique=True, index=True)
    status: str
    stripe_price_id: str
    current_period_end: datetime

    user: "User" = Relationship(back_populates="subscriptions")

from .user import User
User.subscriptions = Relationship(back_populates="user")
