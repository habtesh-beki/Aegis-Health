from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Patient
from app.schemas.patient import PatientCreate, patientResponse

router = APIRouter(prefix="/patients")

@router.post("/", response_model=patientResponse)
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db)
):
 exist_patient = db.query(Patient).filter(Patient.name == patient.name, Patient.hospital_id == patient.hospital_id).first()

 if exist_patient:
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Patient already exists")

 try:
    new_patient = Patient(**patient.dict())
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient
 except Exception as e:
     db.rollback()
     raise HTTPException(status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Could not create patient. Please try again. {str(e)}")

@router.get("/", response_model=list[patientResponse])
def list_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()


@router.get("/{patient_id}", response_model=patientResponse)
def get_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="patient not found")
    return patient