from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from sqlalchemy import text
from models.monitoring_report import MonitoringReport
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/relatorios/")
def get_relatorios(db: Session = Depends(get_db)):
    relatorios = db.query(MonitoringReport).all() 
    return relatorios

@app.get("/relatorios/{relatorio_id}")
def get_relatorio_by_id(relatorio_id: int, db: Session = Depends(get_db)):
    relatorio = db.query(MonitoringReport).filter(MonitoringReport.id == relatorio_id).first()
    if relatorio:
        return relatorio
    return {"error": "Relatório não encontrado"}