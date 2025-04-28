from database.db import Base
from sqlalchemy import Column, Integer, String,DateTime
from datetime import datetime

class Site(Base):
    __tablename__ = "Sites"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)