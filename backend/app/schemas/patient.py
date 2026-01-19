from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    email: Optional[str] = None
    phone: Optional[str] = None


class patientResponse(BaseModel):
    id: int
    name: str
    age: int
    gender: str
    created_at: datetime

    class Config:
        from_attributes = True