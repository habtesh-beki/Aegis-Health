from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Prediction
from app.schemas.prediction import PredictionCreate, PredictionResponse

router = APIRouter(prefix="/predictions")

# @router.post("/", response_model=PredictionResponse)
# def create_prediction(
#     prediction:
# )