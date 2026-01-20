from pydantic import BaseModel , Field
from typing import Annotated

class PredictionCreate(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int

class DiabetesPredictionRequest(BaseModel):
    Pregnancies: Annotated[int, Field(ge=0, le=20)]
    Glucose: Annotated[float, Field(ge=0, le=300)]
    BloodPressure: Annotated[float, Field(ge=0, le=200)]
    SkinThickness: Annotated[float, Field(ge=0, le=100)]
    Insulin: Annotated[float, Field(ge=0, le=1000)]
    BMI: Annotated[float, Field(ge=0, le=80)]
    DiabetesPedigreeFunction: Annotated[float, Field(ge=0, le=5)]
    Age: Annotated[int, Field(ge=0, le=120)]



class PredictionResponse(BaseModel):
    risk_probability: float
    risk_level: str

   