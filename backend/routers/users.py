from fastapi import APIRouter, HTTPException
from typing import List
from models.user import User, UserCreate
from firebase_config import db

router = APIRouter()

@router.post("/users/", response_model=User)
def create_user(user: UserCreate):
    users_ref = db.collection("users")
    # Verifica se já existe usuário com o mesmo email
    existing = users_ref.where("email", "==", user.email).get()
    if existing:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    doc_ref = users_ref.document()
    doc_ref.set({"username": user.username, "email": user.email, "password": user.password})
    return User(id=doc_ref.id, username=user.username, email=user.email)

@router.get("/users/", response_model=List[User])
def list_users():
    users_ref = db.collection("users").stream()
    users = [User(id=doc.id, **doc.to_dict()) for doc in users_ref]
    return users
