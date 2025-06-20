from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class DBMood(Base):
    __tablename__ = "moods"
    id = Column(Integer, primary_key=True, index=True)
    mood = Column(String)
    description = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
