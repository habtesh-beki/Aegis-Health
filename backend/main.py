from fastapi import FastAPI
from app.api import hospital_router

app = FastAPI(title="Aegis Health API")

# app.include_router(patients.router)
# app.include_router(predictions.router)
app.include_router(hospital_router)

# from fastapi import FastAPI
# from app.api import patients, auth, predictions

# app = FastAPI(title="Aegis Health API")

# app.include_router(auth.router, prefix="/api/v1")
# app.include_router(patients.router, prefix="/api/v1")
# app.include_router(predictions.router, prefix="/api/v1")


