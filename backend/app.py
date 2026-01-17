from pydantic import BaseModel,Field


class PatientData(BaseModel):
    pregnancies: int = Field(..., ge=0 , le=20)
    glucose: float = Field(..., ge=0, le=300)
    blood_pressure:float = Field(..., ge=0, le=200)
    bmi:float = Field(..., ge=0, le=70)
    age: int = Field(..., ge=0, le=120)

    class Config:
        schema_extra = {
            "example": {
                "pregnancies": 2,
                "glucose": 120.5,
                "blood_pressure": 80.0,
                "bmi": 25.4,
                "age": 35
            }
        }