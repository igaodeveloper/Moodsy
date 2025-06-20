from pydantic import BaseModel
from typing import Optional

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
