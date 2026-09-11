from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date
from enum import Enum

class RiskLevelEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class ProjectStatusEnum(str, Enum):
    completed = "Completed"
    in_progress = "In Progress"
    delayed = "Delayed"
    sanctioned = "Sanctioned"

# Signal Schema
class SignalSchema(BaseModel):
    label: str
    score: int
    color: str
    desc: str

# Timeline Schema
class TimelineSchema(BaseModel):
    label: str
    date: str
    amount: Optional[str] = None
    state: str

# Evidence Schema
class EvidenceSchema(BaseModel):
    item: str
    observed: str
    reference: str
    deviation: str
    source: str
    confidence: int

# Project Schemas
class ProjectBase(BaseModel):
    pid: str
    name: str
    category: str
    state: str
    district: str
    constituency: str
    mp: str
    agency: str
    sanction_date: date
    expected_completion: date
    status: ProjectStatusEnum
    sanction_amount: float
    expenditure: float
    payment_released: float
    progress: int = Field(ge=0, le=100)
    risk_score: int = Field(ge=0, le=100)
    risk_level: RiskLevelEnum

class ProjectCreate(ProjectBase):
    signals: Optional[List[SignalSchema]] = []
    timeline: Optional[List[TimelineSchema]] = []
    evidence: Optional[List[EvidenceSchema]] = []

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[ProjectStatusEnum] = None
    expenditure: Optional[float] = None
    payment_released: Optional[float] = None
    progress: Optional[int] = Field(None, ge=0, le=100)
    risk_score: Optional[int] = Field(None, ge=0, le=100)
    risk_level: Optional[RiskLevelEnum] = None

class ProjectResponse(ProjectBase):
    id: int
    signals: List[SignalSchema]
    timeline: List[TimelineSchema]
    evidence: List[EvidenceSchema]

    class Config:
        from_attributes = True

# Alert Schemas
class AlertBase(BaseModel):
    alert_id: str
    type: str
    description: str
    risk_score: int = Field(ge=0, le=100)
    risk_level: RiskLevelEnum
    status: str = "Pending Review"

class AlertCreate(AlertBase):
    project_id: int
    detected_date: date

class AlertUpdate(BaseModel):
    status: Optional[str] = None
    description: Optional[str] = None

class AlertResponse(AlertBase):
    id: int
    project_id: int
    detected_date: date

    class Config:
        from_attributes = True

# Vendor Schemas
class VendorFactorSchema(BaseModel):
    label: str
    score: int
    desc: str

class VendorProjectSchema(BaseModel):
    pid: str
    name: str
    amount: str
    status: str
    riskScore: int

class VendorBase(BaseModel):
    vendor_id: str
    name: str
    type: str
    projects_count: int
    total_amount: float
    completed: int
    delayed: int
    high_risk: int
    anomalies: int
    duplicate_assoc: int
    risk_score: int = Field(ge=0, le=100)
    risk_level: RiskLevelEnum

class VendorCreate(VendorBase):
    factors: List[VendorFactorSchema]
    project_list: List[VendorProjectSchema]

class VendorResponse(VendorBase):
    id: int
    factors: List[VendorFactorSchema]
    project_list: List[VendorProjectSchema]

    class Config:
        from_attributes = True

# MP Schemas
class MPFactorSchema(BaseModel):
    label: str
    score: int
    desc: str

class MPBase(BaseModel):
    mp_id: str
    name: str
    party: str
    constituency: str
    state: str
    total_projects: int
    total_funds: float
    completed: int
    delayed: int
    high_risk: int
    avg_risk_score: int = Field(ge=0, le=100)
    risk_level: RiskLevelEnum
    monitoring_rating: str

class MPCreate(MPBase):
    factors: List[MPFactorSchema]

class MPResponse(MPBase):
    id: int
    factors: List[MPFactorSchema]

    class Config:
        from_attributes = True

# State Risk Schemas
class DistrictRiskSchema(BaseModel):
    name: str
    risk: int
    projects: int

class StateRiskBase(BaseModel):
    state_code: str
    state_name: str
    total_projects: int
    high_risk_projects: int
    avg_risk_score: int = Field(ge=0, le=100)
    risk_level: RiskLevelEnum

class StateRiskCreate(StateRiskBase):
    districts: List[DistrictRiskSchema]

class StateRiskResponse(StateRiskBase):
    id: int
    districts: List[DistrictRiskSchema]

    class Config:
        from_attributes = True

# Dashboard Stats Schema
class DashboardStats(BaseModel):
    total_projects: int
    total_funds: float
    high_risk_projects: int
    delayed_projects: int
    potential_duplicates: int
    risk_distribution: dict
    monthly_high_risk_trend: List[dict]
    top_districts: List[dict]
