from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, users, tasks
from app.middleware.error_handler import catch_exceptions_middleware
from app.db.init_db import init_db

app = FastAPI(title="My FastAPI App")

# -----------------------------------------
# INITIALIZE DATABASE TABLES
# -----------------------------------------
try:
    init_db()
except Exception as e:
    print("⚠ DB init skipped due to existing tables:", e)

# -----------------------------------------
# GLOBAL ERROR HANDLER
# -----------------------------------------
app.middleware("http")(catch_exceptions_middleware)

# -----------------------------------------
# CORS CONFIG (Frontend ↔ Backend)
# -----------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://suprajaketha.github.io",   # ⭐ GitHub Pages domain
        "https://suprajaketha.github.io/fastapi"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------
# ROUTES
# -----------------------------------------
app.include_router(auth.router, prefix="/auth")
app.include_router(users.router, prefix="/users")
app.include_router(tasks.router, prefix="/tasks")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "Backend is running on Render!"}
