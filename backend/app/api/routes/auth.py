from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.user_schema import UserCreate, LoginSchema
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/register")
def register(data: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if user:
        raise HTTPException(400, "Email already exists")

    new_user = User(email=data.email, password=hash_password(data.password))
    db.add(new_user)
    db.commit()

    return {"message": "User registered"}

@router.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(401, "Invalid credentials")

    token = create_access_token({"sub": user.email})
    return {"token": token}
