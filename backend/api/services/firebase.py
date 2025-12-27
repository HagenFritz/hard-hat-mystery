import firebase_admin
from firebase_admin import credentials, auth
from api.config import settings

# Firebase Admin initialization placeholder
def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    if not firebase_admin._apps:
        if settings.firebase_credentials_path:
            cred = credentials.Certificate(settings.firebase_credentials_path)
        else:
            # Use default credentials for development
            cred = credentials.ApplicationDefault()
        
        firebase_admin.initialize_app(cred, {
            "projectId": settings.firebase_project_id or settings.gcp_project_id
        })

def verify_firebase_token(token: str) -> dict:
    """Verify Firebase ID token and return decoded token"""
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise ValueError(f"Invalid token: {e}")
