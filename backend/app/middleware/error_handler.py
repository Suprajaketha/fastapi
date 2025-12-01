from fastapi.responses import JSONResponse
from fastapi import Request

async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as ex:
        # You can add logging here
        return JSONResponse(
            status_code=500,
            content={"message": "Internal Server Error", "details": str(ex)}
        )
