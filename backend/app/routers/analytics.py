from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.models.models import Project as ProjectModel, RiskLevel, ProjectStatus, Alert as AlertModel
from app.schemas.schemas import DashboardStats

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/dashboard-stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    """Get aggregated statistics for the main dashboard"""
    # Total projects
    total_projects = db.query(ProjectModel).count()

    # Total funds
    total_funds = db.query(func.sum(ProjectModel.sanction_amount)).scalar() or 0

    # High risk projects (score >= 76)
    high_risk_projects = db.query(ProjectModel).filter(
        ProjectModel.risk_level.in_([RiskLevel.high, RiskLevel.critical])
    ).count()

    # Delayed projects
    delayed_projects = db.query(ProjectModel).filter(
        ProjectModel.status == ProjectStatus.delayed
    ).count()

    # Potential duplicates (alerts with type 'Duplicate Similarity')
    potential_duplicates = db.query(AlertModel).filter(
        AlertModel.type.ilike('%duplicate%')
    ).count()

    # Risk distribution
    critical_count = db.query(ProjectModel).filter(ProjectModel.risk_level == RiskLevel.critical).count()
    high_count = db.query(ProjectModel).filter(ProjectModel.risk_level == RiskLevel.high).count()
    medium_count = db.query(ProjectModel).filter(ProjectModel.risk_level == RiskLevel.medium).count()
    low_count = db.query(ProjectModel).filter(ProjectModel.risk_level == RiskLevel.low).count()

    risk_distribution = {
        "critical": critical_count,
        "high": high_count,
        "medium": medium_count,
        "low": low_count
    }

    # Monthly high risk trend (sample/placeholder data - in real app would be grouped by date)
    monthly_trend = [
        {"month": "Apr '23", "count": 320},
        {"month": "May '23", "count": 480},
        {"month": "Jun '23", "count": 690},
        {"month": "Jul '23", "count": 510},
        {"month": "Aug '23", "count": 420},
        {"month": "Sep '23", "count": 380},
        {"month": "Oct '23", "count": 490},
        {"month": "Nov '23", "count": 620},
        {"month": "Dec '23", "count": 710},
        {"month": "Jan '24", "count": 890},
        {"month": "Feb '24", "count": 640},
        {"month": "Mar '24", "count": 580},
    ]

    # Top districts by risk
    top_districts = [
        {"district": "Mandya", "state": "Karnataka", "highRisk": 142, "avgRisk": 72},
        {"district": "Gaya", "state": "Bihar", "highRisk": 128, "avgRisk": 69},
        {"district": "Darrang", "state": "Assam", "highRisk": 116, "avgRisk": 68},
        {"district": "Nanded", "state": "Maharashtra", "highRisk": 104, "avgRisk": 67},
        {"district": "Barpeta", "state": "Assam", "highRisk": 96, "avgRisk": 65},
    ]

    return DashboardStats(
        total_projects=total_projects,
        total_funds=total_funds,
        high_risk_projects=high_risk_projects,
        delayed_projects=delayed_projects,
        potential_duplicates=potential_duplicates,
        risk_distribution=risk_distribution,
        monthly_high_risk_trend=monthly_trend,
        top_districts=top_districts
    )
