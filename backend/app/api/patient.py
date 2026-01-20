from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Patient
from app.schemas.patient import PatientCreate, patientResponse
from app.schemas.prediction import DiabetesPredictionRequest
from app.services.prediction_service import create_prediction
import logging
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/patients")

@router.post("/", response_model=patientResponse)
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db)
):
    existing_patient = db.query(Patient).filter(
        Patient.patient_name == patient.patient_name,
        Patient.hospital_id == patient.hospital_id
    ).first()

    if existing_patient:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Patient already exists"
        )

    try:
        new_patient = Patient(**patient.model_dump())
        db.add(new_patient)
        db.commit()
        db.refresh(new_patient)
        
        ml_payload = DiabetesPredictionRequest(
            Pregnancies=patient.pregnancies,
            Glucose=patient.glucose,
            BloodPressure=patient.blood_pressure,
            SkinThickness=patient.skin_thickness,
            Insulin=patient.insulin,
            BMI=patient.bmi,
            DiabetesPedigreeFunction=patient.DiabetesPedigreeFunction,
            Age=patient.age
        )

        prediction_result = create_prediction(ml_payload.model_dump())
        new_patient.risk_probability = prediction_result["risk_probability"]
        new_patient.risk_level = prediction_result["risk_level"]

        db.commit()
        db.refresh(new_patient)

        return new_patient

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Could not create patient : {str(e)}"
        )


@router.get("/", response_model=list[patientResponse])
def list_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()


@router.get("/{patient_id}", response_model=patientResponse)
def get_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="patient not found")
    return patient