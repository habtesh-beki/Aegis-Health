from pydantic import BaseModel

class PredictionCreate(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int


class PredictionResponse(BaseModel):
    risk_probability: float
    risk_level: str

   