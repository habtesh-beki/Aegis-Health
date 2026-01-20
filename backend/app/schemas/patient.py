from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class PatientCreate(BaseModel):
    hospital_id: int
    patient_name: str
    age: int
    pregnancies: int
    glucose: float
    blood_pressure: float
    skin_thickness: float
    DiabetesPedigreeFunction: float
    insulin: float
    bmi: float

class patientResponse(BaseModel):
    id: int
    hospital_id: int
    patient_name: str
    age: int
    pregnancies: int
    glucose: float
    blood_pressure: float
    skin_thickness: float
    insulin: float
    bmi: float
    risk_probability: float
    DiabetesPedigreeFunction: float
    risk_level: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }