# from fastapi import FastAPI
from fastapi import FastAPI
# from app.api import hospital_router , prediction_router, patient_router
from app.api import hospital_router , prediction_router, patient_router
from fastapi.middleware.cors import CORSMiddleware
from app.db.models import Base
from app.db.session import engine


app = FastAPI(title="Aegis Health API")

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],                      
    allow_headers=["*"],                     
)


app.include_router(patient_router)
app.include_router(prediction_router)
app.include_router(hospital_router)

# from fastapi import FastAPI
# from app.api import patients, auth, predictions

# app = FastAPI(title="Aegis Health API")

# app.include_router(auth.router, prefix="/api/v1")
# app.include_router(patients.router, prefix="/api/v1")
# app.include_router(predictions.router, prefix="/api/v1")


