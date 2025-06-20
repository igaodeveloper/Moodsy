from pydantic import BaseModel
from typing import Optional

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
