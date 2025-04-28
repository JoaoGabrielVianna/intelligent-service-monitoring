from sqlalchemy.orm import Session
from apscheduler.schedulers.background import BackgroundScheduler
from models.site import Site
from models.monitoring_report import MonitoringReport
from fastapi import WebSocket, WebSocketDisconnect
from threading import Thread
import requests
import asyncio
import time

# Armazenar os resultados do monitoramento na memória
monitoring_data = {}

# Função para monitorar o site e salvar os resultados
def monitor_site(site: Site, db: Session):
    start_time = time.time()

    # Verifica se o site ainda existe antes de tentar monitorá-lo
    site = db.query(Site).filter(Site.id == site.id).first()
    if not site:
        print(f"Site {site.id} foi deletado, não monitorando.")
        return  # Retorna sem fazer a inserção no relatório, evitando o erro de chave estrangeira

    try:
        response = requests.get(site.url)
        status = response.status_code
        response_time = response.elapsed.total_seconds()

        print(f"Monitorando {site.url} | Status: {status} | Tempo de resposta: {response_time:.2f}s | Hora: {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(start_time))}")

    except requests.exceptions.RequestException as e:
        print(f"Erro ao monitorar o site {site.url}: {e}")
        status = None
        response_time = None

    # Atualiza os dados de monitoramento na memória
    monitoring_data[site.url] = {
        "status": status if status is not None else "Error",
        "response_time": response_time,
        "timestamp": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(start_time))
    }

    # Salva o resultado no banco de dados
    report = MonitoringReport(
        site_id=site.id,
        status_code=status,
        response_time=response_time,
        timestamp=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(start_time))
    )
    db.add(report)
    db.commit()

# Função para verificar novos sites e atualizá-los no monitoramento
def update_sites_monitoring(db: Session, scheduler: BackgroundScheduler, interval: int):
    sites = db.query(Site).all()

    if not sites:  # Verifica se não há sites
        print("Nenhum site encontrado para monitoramento.")
        return  # Se não houver sites, sai da função sem tentar agendar ou remover nada

    scheduled_site_ids = {job.id for job in scheduler.get_jobs()}

    for site in sites:
        if str(site.id) not in scheduled_site_ids:
            print(f"Adicionando novo site para monitoramento: {site.url}")
            scheduler.add_job(
                monitor_site,
                'interval',
                args=[site, db],
                seconds=interval,
                id=str(site.id)
            )

    # Verificar e remover sites que foram deletados
    for job in scheduler.get_jobs():
        site_id = job.id
        site = db.query(Site).filter(Site.id == site_id).first()
        if site is None:
            print(f"Removendo site {site_id} que foi deletado.")
            job.remove()

# Função para iniciar o monitoramento
def start_monitoring(db: Session, interval: int = 5):
    scheduler = BackgroundScheduler()

    # Adiciona inicialmente os sites para monitoramento
    update_sites_monitoring(db, scheduler, interval)

    scheduler.start()

    print(f"Monitoramento iniciado... Relatórios sendo impressos a cada {interval} segundos")

    try:
        while True:
            time.sleep(1)
            update_sites_monitoring(db, scheduler, interval)  # Atualiza a cada segundo, pode ser otimizado conforme necessário
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()

# Função para enviar os relatórios via WebSocket
async def send_reports(websocket: WebSocket, interval: int = 5):
    await websocket.accept()

    try:
        while True:
            for url, data in monitoring_data.items():
                report = (
                    f"Monitorando {url} | "
                    f"Status: {data['status']} | "
                    f"Tempo de resposta: {data['response_time']}s | "
                    f"Hora: {data['timestamp']}"
                )
                await websocket.send_text(report)
            await asyncio.sleep(interval)
    except WebSocketDisconnect:
        print("Cliente desconectado")

# Função para rodar o monitoramento em segundo plano
def run_monitoring_background(db: Session, interval: int = 5):
    monitoring_thread = Thread(target=start_monitoring, args=(db, interval))
    monitoring_thread.start()
