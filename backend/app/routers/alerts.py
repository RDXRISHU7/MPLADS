from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.models import Alert as AlertModel, RiskLevel
from app.schemas.schemas import AlertResponse, AlertCreate, AlertUpdate

router = APIRouter(prefix="/alerts", tags=["alerts"])

@router.get("/", response_model=List[AlertResponse])
def get_alerts(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    risk_level: Optional[RiskLevel] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all risk alerts with optional filtering"""
    query = db.query(AlertModel)

    if risk_level:
        query = query.filter(AlertModel.risk_level == risk_level)
    if status:
        query = query.filter(AlertModel.status == status)

    return query.offset(skip).limit(limit).all()

@router.get("/{alert_id}", response_model=AlertResponse)
def get_alert(alert_id: int, db: Session = Depends(get_db)):
    """Get a specific alert by ID"""
    alert = db.query(AlertModel).filter(AlertModel.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.post("/", response_model=AlertResponse, status_code=201)
def create_alert(alert: AlertCreate, db: Session = Depends(get_db)):
    """Create a new risk alert"""
    db_alert = AlertModel(**alert.dict())
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

@router.put("/{alert_id}", response_model=AlertResponse)
def update_alert(alert_id: int, alert_update: AlertUpdate, db: Session = Depends(get_db)):
    """Update an existing alert (e.g., status, description)"""
    db_alert = db.query(AlertModel).filter(AlertModel.id == alert_id).first()
    if not db_alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    update_data = alert_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_alert, field, value)

    db.commit()
    db.refresh(db_alert)
    return db_alert

@router.delete("/{alert_id}", status_code=204)
def delete_alert(alert_id: int, db: Session = Depends(get_db)):
    """Delete an alert"""
    db_alert = db.query(AlertModel).filter(AlertModel.id == alert_id).first()
    if not db_alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    db.delete(db_alert)
    db.commit()
    return None
