from models.models import Site
from sqlalchemy.orm import Session
from schemas.schemas import SitesAdd

def update_site(db: Session, site_id: int, data: SitesAdd):
    db_site = db.query(Site).filter(Site.id == site_id).first()
    if not db_site:
        return None

    db_site.url = data.url
    
    db.commit()
    db.refresh(db_site)
    return db_site
