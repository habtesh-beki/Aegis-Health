from pydantic import BaseModel


class HospitalCreate(BaseModel):
    name: str
    address: str
    phone: str
    email: str
    password: str


class HospitalResponse(BaseModel):
    id: int
    name: str
    address: str
    phone: str
    email: str
    password_hash: str

    class Config:
        from_attributes = True