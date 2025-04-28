from fastapi import APIRouter, Depends, HTTPException
from schemas.schemas import Sites as SitesSchema, SitesAdd as SitesAddSchema
from database.db import get_db
from sqlalchemy.orm import Session
from services.updateSite import update_site as update_site_service

router = APIRouter()

@router.put("/sites/{site_id}", response_model=SitesSchema)
def update_site(site_id: int, site: SitesAddSchema, db: Session = Depends(get_db)):
    updated_site = update_site_service(db, site_id, site)
    if not updated_site:
        raise HTTPException(status_code=404, detail="Site not found")
    return updated_site