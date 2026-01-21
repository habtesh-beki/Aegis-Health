from datetime import datetime
from pydantic import BaseModel, EmailStr


class HospitalCreate(BaseModel):
    registration_number: str
    hospital_name: str
    admin_name: str
    phone: str
    email: EmailStr
    password: str

class HospitalResponse(BaseModel):
    id: int
    registration_number: str
    hospital_name: str
    admin_name: str
    phone: str
    email: EmailStr
    created_at: datetime
    
    class Config:
        from_attributes = True

class HospitalLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"