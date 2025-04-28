from fastapi import APIRouter, Depends
from schemas.schemas import Sites as SitesSchema
from database.db import get_db
from sqlalchemy.orm import Session
from services.getAllSites import get_sites

router = APIRouter()

@router.get("/sites/", response_model=list[SitesSchema])
def get_all_sites(db: Session = Depends(get_db)):
    return get_sites(db)