from sqlalchemy import Column, Float, Integer , String, DateTime, ForeignKey, Text
from sqlalchemy.orm import declarative_base
from datetime import datetime 


Base = declarative_base()

class Hospital(Base):
    __tablename__ = "hospitals"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    address = Column(Text)  # Added based on HospitalCreate
    phone = Column(String(20))  # Added based on HospitalCreate
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    risk_probability = Column(Float)
    risk_level = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
