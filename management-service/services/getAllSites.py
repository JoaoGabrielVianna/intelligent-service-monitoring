from fastapi import Depends
from database.db import get_db
from models.models import Site
from sqlalchemy.orm import Session

def get_sites(db: Session =Depends(get_db)):
    return db.query(Site).all()