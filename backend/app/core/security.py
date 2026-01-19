from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union, Any
from jose import jwt
# from app.core.config import settings

# Password hashing context
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# JWT settings
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Hash a plaintext password using bcrypt
    """
    return pwd_context.hash(password)

def validate_password_strength(password: str) -> tuple[bool, str]:
    """
    Validate password strength
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if not any(char.isdigit() for char in password):
        return False, "Password must contain at least one number"
    
    if not any(char.isupper() for char in password):
        return False, "Password must contain at least one uppercase letter"
    
    if not any(char.islower() for char in password):
        return False, "Password must contain at least one lowercase letter"
    
    if not any(char in "!@#$%^&*()-_=+[]{}|;:,.<>?" for char in password):
        return False, "Password must contain at least one special character"
    
    return True, "Password is strong"

# JWT Token functions (for authentication)
# def create_access_token(
#     subject: Union[str, Any], 
#     expires_delta: timedelta = None
# ) -> str:
#     """
#     Create JWT access token
#     """
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(
#             minutes=ACCESS_TOKEN_EXPIRE_MINUTES
#         )
    
#     to_encode = {"exp": expire, "sub": str(subject)}
#     encoded_jwt = jwt.encode(
#         to_encode, 
#         settings.SECRET_KEY, 
#         algorithm=ALGORITHM
#     )
#     return encoded_jwt

# def verify_token(token: str) -> dict:
#     """
#     Verify JWT token

#     """
#     try:
#         payload = jwt.decode(
#             token, 
#             settings.SECRET_KEY, 
#             algorithms=[ALGORITHM]
#         )
#         return payload
#     except jwt.JWTError:
#         return None