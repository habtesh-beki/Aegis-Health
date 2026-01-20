from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.prediction import DiabetesPredictionRequest
from app.db.session import get_db
from app.services.prediction_service import create_prediction

router = APIRouter()

@router.post("/predict")
def predict(
    data: DiabetesPredictionRequest,
    db: Session = Depends(get_db)
):
    
    print("Received prediction request with data:", data)
    prediction = create_prediction(db, data.dict())
    
    return {
        "prediction_id": prediction.id,
        "risk_probability": f"{prediction.risk_probability}%",
        "risk_level": prediction.risk_level
    }
