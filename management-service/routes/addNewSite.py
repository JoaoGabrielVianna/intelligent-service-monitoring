from fastapi import APIRouter, Depends
from schemas.schemas import Sites as SitesSchema, SitesAdd as SitesAddSchema
from database.db import get_db
from sqlalchemy.orm import Session
from services.addNewSite import add_site 

router = APIRouter()

@router.post("/sites/", response_model=SitesSchema)
def add_new_site(site: SitesAddSchema, db: Session = Depends(get_db)):
    return add_site(db, site)