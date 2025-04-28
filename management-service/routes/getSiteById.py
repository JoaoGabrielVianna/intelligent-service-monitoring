from fastapi import APIRouter, Depends, HTTPException
from schemas.schemas import Sites as SitesSchema
from database.db import get_db
from sqlalchemy.orm import Session
from services.getSiteById import get_site

router = APIRouter()

@router.get("/sites/{site_id}", response_model=SitesSchema)
def get_site_by_id(site_id: int, db: Session = Depends(get_db)):
    site = get_site(db, site_id)
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    return site