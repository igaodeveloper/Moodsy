from fastapi import APIRouter, HTTPException
from typing import List
from models.mission import Mission, MissionCreate
from firebase_config import db

router = APIRouter()

@router.post("/missions/", response_model=Mission)
def create_mission(mission: MissionCreate):
    missions_ref = db.collection("missions")
    doc_ref = missions_ref.document()
    doc_ref.set({"title": mission.title, "description": mission.description, "completed": False, "user_id": 1})
    return Mission(id=doc_ref.id, title=mission.title, description=mission.description, completed=False, user_id=1)

@router.get("/missions/", response_model=List[Mission])
def list_missions():
    missions_ref = db.collection("missions").stream()
    missions = [Mission(id=doc.id, **doc.to_dict()) for doc in missions_ref]
    return missions
