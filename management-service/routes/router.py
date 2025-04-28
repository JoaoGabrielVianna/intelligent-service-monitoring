from fastapi import APIRouter
from .getAllSites import router as get_all_sites_router
from .getSiteById import router as get_site_by_id_router
from .addNewSite import router as add_new_site_router
from .updateSite import router as update_site_router
from .deleteSite import router as delete_site_router

router = APIRouter()

# Incluindo as rotas
router.include_router(get_all_sites_router)
router.include_router(get_site_by_id_router)
router.include_router(add_new_site_router)
router.include_router(update_site_router)
router.include_router(delete_site_router)