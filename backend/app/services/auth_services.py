from sqlalchemy.orm import Session
from app.db.models import Hospital
from app.core.security import  verify_password, create_access_token


def authenticate_hospital(db: Session, email: str, password: str):
    hospital = db.query(Hospital).filter(Hospital.email == email).first()
    print("Authenticating hospital:", hospital)
    if not hospital or not verify_password(password, hospital.password_hash):
        return None

    token = create_access_token({"sub": str(hospital.id)})
    return token