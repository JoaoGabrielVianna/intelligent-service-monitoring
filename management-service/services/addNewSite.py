from models.models import Site
from sqlalchemy.orm import Session
from schemas.schemas import SitesAdd
from datetime import datetime

def add_site(db: Session, data: SitesAdd):
    db_site = Site(
        **data.model_dump(),
        created_at=datetime.utcnow().isoformat()
    )
    db.add(db_site)
    db.commit()
    db.refresh(db_site)
    return db_site