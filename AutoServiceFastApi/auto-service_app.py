import uvicorn
from fastapi import FastAPI, Depends
import router
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI(title='Autoservice')
app.include_router(router.router, tags=['Autoservice'])
origins = ["*"]
    # "http://localhost:8000",
    # "http://localhost:3000",
    # "http://localhost"


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    uvicorn.run(
        'auto-service_app:app',
        host='localhost',
        port=8083,
        reload=True
    )
