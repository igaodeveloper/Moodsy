from fastapi import APIRouter, HTTPException
from typing import List
from models.mood import Mood, MoodCreate
from firebase_config import db

router = APIRouter()

@router.post("/moods/", response_model=Mood)
def create_mood(mood: MoodCreate):
    moods_ref = db.collection("moods")
    doc_ref = moods_ref.document()
    doc_ref.set({"mood": mood.mood, "description": mood.description, "user_id": 1})
    return Mood(id=doc_ref.id, mood=mood.mood, description=mood.description, user_id=1)

@router.get("/moods/", response_model=List[Mood])
def list_moods():
    moods_ref = db.collection("moods").stream()
    moods = [Mood(id=doc.id, **doc.to_dict()) for doc in moods_ref]
    return moods
