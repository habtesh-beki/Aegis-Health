from fastapi import APIRouter, Depends, HTTPException , status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Hospital
from app.schemas.hospital import HospitalCreate, HospitalResponse
from app.core.security import get_password_hash
# from backend.app.schemas import hospital
from sqlalchemy.exc import IntegrityError 


router = APIRouter(prefix="/hospitals")

@router.post("/", response_model=HospitalResponse, status_code = status.HTTP_201_CREATED)
def create_hospital(hospital: HospitalCreate, db: Session = Depends(get_db)):
    print("Creating hospital:", hospital)
    existing_hospital = db.query(Hospital).filter(
        Hospital.name == hospital.name,
        Hospital.address == hospital.address
    ).first()
    print("Existing hospital check:", existing_hospital)
    if existing_hospital:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Hospital '{hospital.name}' already exists at {hospital.address}"
        )
    try:
         print("Hashing password for  hospital:", hospital.password)
         password_hash = get_password_hash(hospital.password)
         print("Hashed password:", password_hash)
         new_hospital = Hospital(
              name=hospital.name,
              address=hospital.address,
              phone=hospital.phone,
              email=hospital.email,
              password_hash=password_hash
         )
         db.add(new_hospital)
         db.commit()
         db.refresh(new_hospital)
         return new_hospital
    
    except IntegrityError as e:
        # Handle database integrity errors (unique constraint violations)
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail= f"Hospital already exists (database constraint) {str(e)}"
        )
    
    except Exception as e:
        # Catch-all for other errors
        db.rollback()
        # Log the actual error for debugging
        print(f"Error creating hospital: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Could not create hospital. Please try again. {str(e)}"
        )
    
@router.get("/{hospital_id}", response_model=HospitalResponse)
def get_hospital(hospital_id: int, db: Session = Depends(get_db)):
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    return hospital


@router.get("/", response_model=list[HospitalResponse])
def list_hospitals(db: Session = Depends(get_db)):
    return db.query(Hospital).all()