from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Firebase Admin Configuration
    firebase_credentials_path: Optional[str] = None
    firebase_project_id: Optional[str] = None
    
    # Google Cloud Configuration
    gcp_project_id: Optional[str] = None
    gcp_bucket_name: Optional[str] = None
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
