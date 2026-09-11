from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Text, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class RiskLevel(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class ProjectStatus(str, enum.Enum):
    completed = "Completed"
    in_progress = "In Progress"
    delayed = "Delayed"
    sanctioned = "Sanctioned"

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    pid = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(500), nullable=False)
    category = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    constituency = Column(String(100), nullable=False)
    mp = Column(String(200), nullable=False)
    agency = Column(String(300), nullable=False)
    sanction_date = Column(Date, nullable=False)
    expected_completion = Column(Date, nullable=False)
    status = Column(SQLEnum(ProjectStatus), nullable=False, default=ProjectStatus.sanctioned)
    sanction_amount = Column(Float, nullable=False)
    expenditure = Column(Float, nullable=False, default=0)
    payment_released = Column(Float, nullable=False, default=0)
    progress = Column(Integer, nullable=False, default=0)  # 0-100
    risk_score = Column(Integer, nullable=False, default=0)  # 0-100
    risk_level = Column(SQLEnum(RiskLevel), nullable=False, default=RiskLevel.low)
    signals = Column(JSON)  # Array of risk signals
    timeline = Column(JSON)  # Project timeline events
    evidence = Column(JSON)  # Evidence data for anomalies

    # Relationships
    alerts = relationship("Alert", back_populates="project")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    alert_id = Column(String(50), unique=True, index=True, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    type = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(SQLEnum(RiskLevel), nullable=False)
    detected_date = Column(Date, nullable=False, default=func.current_date())
    status = Column(String(50), nullable=False, default="Pending Review")

    # Relationships
    project = relationship("Project", back_populates="alerts")

class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(Integer, primary_key=True, index=True)
    vendor_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(300), nullable=False)
    type = Column(String(100), nullable=False)
    projects_count = Column(Integer, nullable=False, default=0)
    total_amount = Column(Float, nullable=False, default=0)
    completed = Column(Integer, nullable=False, default=0)
    delayed = Column(Integer, nullable=False, default=0)
    high_risk = Column(Integer, nullable=False, default=0)
    anomalies = Column(Integer, nullable=False, default=0)
    duplicate_assoc = Column(Integer, nullable=False, default=0)
    risk_score = Column(Integer, nullable=False, default=0)
    risk_level = Column(SQLEnum(RiskLevel), nullable=False, default=RiskLevel.low)
    factors = Column(JSON)  # Risk factors breakdown
    project_list = Column(JSON)  # Associated projects sample

class MP(Base):
    __tablename__ = "mps"

    id = Column(Integer, primary_key=True, index=True)
    mp_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    party = Column(String(100), nullable=False)
    constituency = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    total_projects = Column(Integer, nullable=False, default=0)
    total_funds = Column(Float, nullable=False, default=0)
    completed = Column(Integer, nullable=False, default=0)
    delayed = Column(Integer, nullable=False, default=0)
    high_risk = Column(Integer, nullable=False, default=0)
    avg_risk_score = Column(Integer, nullable=False, default=0)
    risk_level = Column(SQLEnum(RiskLevel), nullable=False, default=RiskLevel.low)
    monitoring_rating = Column(String(50), nullable=False)
    factors = Column(JSON)  # Risk factors breakdown

class StateRisk(Base):
    __tablename__ = "state_risks"

    id = Column(Integer, primary_key=True, index=True)
    state_code = Column(String(10), unique=True, index=True, nullable=False)
    state_name = Column(String(100), nullable=False)
    total_projects = Column(Integer, nullable=False, default=0)
    high_risk_projects = Column(Integer, nullable=False, default=0)
    avg_risk_score = Column(Integer, nullable=False, default=0)
    risk_level = Column(SQLEnum(RiskLevel), nullable=False, default=RiskLevel.low)
    districts = Column(JSON)  # District risk data
