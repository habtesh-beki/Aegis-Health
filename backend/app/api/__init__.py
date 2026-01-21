# This makes 'hospital' and 'patient' available when importing from app.api
from .hospital import router as hospital_router
from .patient import router as patient_router
from .prediction import router as prediction_router

__all__ = ["hospital_router", "patient_router"]