from fastapi import APIRouter, Depends, HTTPException
from schemas.schemas import Sites as SitesSchema
from database.db import get_db
from sqlalchemy.orm import Session
from services.deleteSite import delete_site as delete_site_service

router = APIRouter()

@router.delete("/sites/{site_id}", response_model=SitesSchema)
def delete_site(site_id: int, db: Session = Depends(get_db)):
    deleted_site = delete_site_service(db, site_id)
    if not deleted_site:
        raise HTTPException(status_code=404, detail="Site not found")
    return deleted_site