from models.site import Site
from sqlalchemy.orm import Session

def get_sites(db: Session):
    return db.query(Site).all()