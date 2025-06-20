from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class AuthDetails(BaseModel):
    username: str
    password: str

@router.post('/register')
def register(auth_details: AuthDetails):
    # Lógica de registro (mock)
    return {"message": "Usuário registrado com sucesso!"}

@router.post('/login')
def login(auth_details: AuthDetails):
    # Lógica de login (mock)
    return {"access_token": "fake-jwt-token"}
