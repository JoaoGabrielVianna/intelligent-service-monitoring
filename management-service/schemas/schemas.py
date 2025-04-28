from pydantic import BaseModel

class SitesBase(BaseModel):
    # id: int
    url: str
    # created_at: str

class SitesAdd(SitesBase):
    pass

class Sites(SitesBase):
    id: int

    class Config:
        # orm_mode = True # Pydantic < 2.x
        from_attributes = True