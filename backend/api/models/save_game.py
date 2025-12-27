from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime

class SaveGameData(BaseModel):
    user_id: str
    chapter: int
    scene: str
    game_state: Dict[str, Any]
    timestamp: datetime

class SaveGameResponse(BaseModel):
    success: bool
    message: str
    save_data: Optional[SaveGameData] = None
