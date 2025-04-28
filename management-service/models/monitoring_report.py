from sqlalchemy import Column, Integer, Float, ForeignKey, TIMESTAMP
from database.db import Base

class MonitoringReport(Base):
    __tablename__ = "Relatorio_monitoramento_site"

    id = Column(Integer, primary_key=True, index=True)  # 🔑 Chave primária do relatório
    site_id = Column(Integer, ForeignKey("Sites.id"), nullable=False)  # 🌐 Chave estrangeira vinculando ao site
    status_code = Column(Integer, nullable=True)  # 📋 Código de status HTTP do site monitorado
    response_time = Column(Float, nullable=True)  # ⏱️ Tempo de resposta do site em segundos
    timestamp = Column(TIMESTAMP, nullable=False)  # 🕒 Data e hora do evento de monitoramento
    created_at = Column(TIMESTAMP, server_default="now()")  # 🗓️ Data e hora de criação do registro com valor padrão
