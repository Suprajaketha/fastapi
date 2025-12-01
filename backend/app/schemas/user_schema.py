from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class LoginSchema(BaseModel):
    email: str
    password: str
