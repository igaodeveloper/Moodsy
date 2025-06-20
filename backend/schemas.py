from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        orm_mode = True

class MoodBase(BaseModel):
    mood: str
    description: Optional[str] = None

class MoodCreate(MoodBase):
    pass

class Mood(MoodBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True

class MissionBase(BaseModel):
    title: str
    description: Optional[str] = None

class MissionCreate(MissionBase):
    pass

class Mission(MissionBase):
    id: int
    completed: bool
    user_id: int
    class Config:
        orm_mode = True
