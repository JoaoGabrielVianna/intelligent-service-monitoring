from models.models import Site
from sqlalchemy.orm import Session

def get_site(db: Session, site_id: int):
    return db.query(Site).filter(Site.id == site_id).first()