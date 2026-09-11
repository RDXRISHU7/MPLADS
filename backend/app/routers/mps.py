from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.models import MP as MPModel, RiskLevel
from app.schemas.schemas import MPResponse, MPCreate

router = APIRouter(prefix="/mps", tags=["mps"])

@router.get("/", response_model=List[MPResponse])
def get_mps(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    state: Optional[str] = None,
    risk_level: Optional[RiskLevel] = None,
    db: Session = Depends(get_db)
):
    """Get all MPs with optional filtering"""
    query = db.query(MPModel)

    if state:
        query = query.filter(MPModel.state == state)
    if risk_level:
        query = query.filter(MPModel.risk_level == risk_level)

    return query.offset(skip).limit(limit).all()

@router.get("/{mp_id}", response_model=MPResponse)
def get_mp(mp_id: int, db: Session = Depends(get_db)):
    """Get a specific MP by ID"""
    mp = db.query(MPModel).filter(MPModel.id == mp_id).first()
    if not mp:
        raise HTTPException(status_code=404, detail="MP not found")
    return mp

@router.post("/", response_model=MPResponse, status_code=201)
def create_mp(mp: MPCreate, db: Session = Depends(get_db)):
    """Create a new MP profile"""
    existing_mp = db.query(MPModel).filter(MPModel.mp_id == mp.mp_id).first()
    if existing_mp:
        raise HTTPException(status_code=400, detail="MP with this ID already exists")

    db_mp = MPModel(
        **mp.dict(exclude={'factors'}),
        factors=[f.dict() for f in mp.factors]
    )

    db.add(db_mp)
    db.commit()
    db.refresh(db_mp)
    return db_mp
