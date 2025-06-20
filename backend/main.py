from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, users, moods, missions

app = FastAPI()

# CORS para frontend Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique o domínio do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, tags=["users"])
app.include_router(moods.router, tags=["moods"])
app.include_router(missions.router, tags=["missions"])

@app.get("/")
def read_root():
    return {"message": "Backend Moodsy API rodando!"}
