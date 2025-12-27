from fastapi import FastAPI
from api.routes import auth, saves

app = FastAPI(title="Hard Hat Mystery API")

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(saves.router, prefix="/saves", tags=["saves"])

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
