from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, users, tasks
from app.middleware.error_handler import catch_exceptions_middleware
from app.db.init_db import init_db
init_db()

app = FastAPI(title="My FastAPI App")

# GLOBAL ERROR HANDLER
app.middleware("http")(catch_exceptions_middleware)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(auth.router, prefix="/auth")
app.include_router(users.router, prefix="/users")
app.include_router(tasks.router, prefix="/tasks")

@app.get("/health")
def health():
    return {"status": "ok"}
@app.get("/")
def root():
    return {"message": "Backend is running!"}
