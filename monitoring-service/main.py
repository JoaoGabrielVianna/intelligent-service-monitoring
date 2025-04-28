from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from services.monitoringSites import send_reports, run_monitoring_background
from database.db import get_db
from database.db import create_table


# 🚀✨ Criação da aplicação FastAPI para o Intelligent Service Monitoring! ✨🚀
app = FastAPI()

# Chamar a função para criar as tabelas
create_table()

# Endpoint WebSocket para receber relatórios em tempo real
@app.websocket("/ws-monitoring")
async def websocket_endpoint(websocket: WebSocket):
    await send_reports(websocket)

# Função para rodar o monitoramento em background
@app.on_event("startup")
async def startup_event():
    db = next(get_db())  # Substitua por sua função de obtenção do DB
    run_monitoring_background(db, interval=5)
