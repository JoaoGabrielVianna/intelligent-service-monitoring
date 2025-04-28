from models.models import Site
from sqlalchemy.orm import Session
from models.monitoring_report import MonitoringReport

def delete_site(db: Session, site_id: int):
    # Excluir relatórios associados ao site
    db.query(MonitoringReport).filter(MonitoringReport.site_id == site_id).delete()
    db.commit()

    db_site = db.query(Site).filter(Site.id == site_id).first()
    if not db_site:
        return None
    
    # Deleta o site
    db.delete(db_site)
    db.commit()
    return db_site
