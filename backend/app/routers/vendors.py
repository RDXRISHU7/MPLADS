from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.models import Vendor as VendorModel, RiskLevel
from app.schemas.schemas import VendorResponse, VendorCreate

router = APIRouter(prefix="/vendors", tags=["vendors"])

@router.get("/", response_model=List[VendorResponse])
def get_vendors(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    risk_level: Optional[RiskLevel] = None,
    db: Session = Depends(get_db)
):
    """Get all vendors with optional filtering"""
    query = db.query(VendorModel)

    if risk_level:
        query = query.filter(VendorModel.risk_level == risk_level)

    return query.offset(skip).limit(limit).all()

@router.get("/{vendor_id}", response_model=VendorResponse)
def get_vendor(vendor_id: int, db: Session = Depends(get_db)):
    """Get a specific vendor by ID"""
    vendor = db.query(VendorModel).filter(VendorModel.id == vendor_id).first()
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return vendor

@router.post("/", response_model=VendorResponse, status_code=201)
def create_vendor(vendor: VendorCreate, db: Session = Depends(get_db)):
    """Create a new vendor profile"""
    existing_vendor = db.query(VendorModel).filter(VendorModel.vendor_id == vendor.vendor_id).first()
    if existing_vendor:
        raise HTTPException(status_code=400, detail="Vendor with this ID already exists")

    db_vendor = VendorModel(
        **vendor.dict(exclude={'factors', 'project_list'}),
        factors=[f.dict() for f in vendor.factors],
        project_list=[p.dict() for p in vendor.project_list]
    )

    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)
    return db_vendor
