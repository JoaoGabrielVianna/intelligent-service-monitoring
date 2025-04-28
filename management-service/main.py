from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.router import router
from database.db import create_table


# 🚀✨ Criação da aplicação FastAPI para o Intelligent Service Monitoring! ✨🚀
app = FastAPI()

# Chamar a função para criar as tabelas
create_table()

origins = [
    "http://localhost:3000",
]

# Adicionar o middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔗 Incluindo o roteador para gerenciar as rotas da aplicação
app.include_router(router)

# 🌟 Rota raiz para dar boas-vindas aos usuários! 🌟
@app.get("/")
def read_root():
    return {"message": "👋 Welcome to the Intelligent Service Monitoring API 🚀"}