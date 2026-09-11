from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.models import Project as ProjectModel, RiskLevel, ProjectStatus
from app.schemas.schemas import ProjectResponse, ProjectCreate, ProjectUpdate

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/", response_model=List[ProjectResponse])
def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    state: Optional[str] = None,
    risk_level: Optional[RiskLevel] = None,
    status: Optional[ProjectStatus] = None,
    db: Session = Depends(get_db)
):
    """Get all projects with optional filtering"""
    query = db.query(ProjectModel)

    if state:
        query = query.filter(ProjectModel.state == state)
    if risk_level:
        query = query.filter(ProjectModel.risk_level == risk_level)
    if status:
        query = query.filter(ProjectModel.status == status)

    return query.offset(skip).limit(limit).all()

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """Get a specific project by ID"""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/pid/{pid}", response_model=ProjectResponse)
def get_project_by_pid(pid: str, db: Session = Depends(get_db)):
    """Get a specific project by PID"""
    project = db.query(ProjectModel).filter(ProjectModel.pid == pid).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("/", response_model=ProjectResponse, status_code=201)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    """Create a new project"""
    # Check if PID already exists
    existing_project = db.query(ProjectModel).filter(ProjectModel.pid == project.pid).first()
    if existing_project:
        raise HTTPException(status_code=400, detail="Project with this PID already exists")

    # Create new project model instance
    db_project = ProjectModel(
        **project.dict(exclude={'signals', 'timeline', 'evidence'}),
        signals=[s.dict() for s in project.signals] if project.signals else [],
        timeline=[t.dict() for t in project.timeline] if project.timeline else [],
        evidence=[e.dict() for e in project.evidence] if project.evidence else []
    )

    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project_update: ProjectUpdate, db: Session = Depends(get_db)):
    """Update an existing project"""
    db_project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Update only provided fields
    update_data = project_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_project, field, value)

    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/{project_id}", status_code=204)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """Delete a project"""
    db_project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(db_project)
    db.commit()
    return None
