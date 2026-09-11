import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine, Base
from app.models.models import Project, Alert, Vendor, MP, RiskLevel, ProjectStatus
from datetime import date

def seed_database():
    # Create tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(Project).count() > 0:
            print("Database already contains data, skipping seed.")
            return

        print("Seeding database with initial MPLADS data...")

        # 1. Seed Projects
        sample_projects = [
            Project(
                pid="MP/KA/2024/4821",
                name="Community Hall at Village Halagur",
                category="Community Infrastructure",
                state="Karnataka",
                district="Mandya",
                constituency="Mandya",
                mp="Hon. Suresh Kumar (Karnataka)",
                agency="Gram Panchayat, Halagur",
                sanction_date=date(2023, 5, 15),
                expected_completion=date(2023, 11, 30),
                status=ProjectStatus.delayed,
                sanction_amount=1200000,
                expenditure=1980000,
                payment_released=1620000,
                progress=34,
                risk_score=87,
                risk_level=RiskLevel.critical,
                signals=[
                    {"label": "Cost Anomaly", "score": 25, "color": "#ef4444", "desc": "Expenditure exceeds sanctioned amount by 65%."},
                    {"label": "Payment Pattern", "score": 22, "color": "#f97316", "desc": "135% payment against 34% physical progress."},
                    {"label": "Delay Signal", "score": 18, "color": "#f59e0b", "desc": "Delayed by 199 days beyond expected completion."}
                ],
                timeline=[
                    {"label": "Sanctioned", "date": "15 May 2023", "amount": "₹12,00,000", "state": "completed"},
                    {"label": "Expenditure", "date": "30 Oct 2023", "amount": "₹19,80,000", "state": "anomaly"},
                    {"label": "Progress", "date": "5 Jan 2024", "amount": None, "state": "delayed"}
                ],
                evidence=[
                    {"item": "Total Expenditure", "observed": "₹19.8L", "reference": "₹12.0L", "deviation": "+65%", "source": "PFMS", "confidence": 91}
                ]
            ),
            Project(
                pid="MP/BR/2024/1932",
                name="Drain Construction Work",
                category="Sanitation",
                state="Bihar",
                district="Gaya",
                constituency="Gaya",
                mp="Hon. Vijay Kumar (Bihar)",
                agency="Rural Works Department, Gaya",
                sanction_date=date(2023, 8, 10),
                expected_completion=date(2024, 2, 28),
                status=ProjectStatus.delayed,
                sanction_amount=850000,
                expenditure=1420000,
                payment_released=663000,
                progress=41,
                risk_score=84,
                risk_level=RiskLevel.critical,
                signals=[
                    {"label": "Payment Anomaly", "score": 28, "color": "#ef4444", "desc": "Expenditure exceeds sanction by 67%."}
                ],
                timeline=[],
                evidence=[]
            ),
            Project(
                pid="MP/AS/2024/7741",
                name="Rural Road Construction – Phase II",
                category="Roads & Bridges",
                state="Assam",
                district="Darrang",
                constituency="Mangaldoi",
                mp="Hon. Dilip Saikia (Assam)",
                agency="PWD Roads, Mangaldoi Division",
                sanction_date=date(2023, 6, 20),
                expected_completion=date(2024, 4, 30),
                status=ProjectStatus.in_progress,
                sanction_amount=2400000,
                expenditure=2160000,
                payment_released=1800000,
                progress=68,
                risk_score=81,
                risk_level=RiskLevel.critical,
                signals=[
                    {"label": "Duplicate Similarity", "score": 35, "color": "#ef4444", "desc": "94% similarity with nearby project."}
                ],
                timeline=[],
                evidence=[]
            )
        ]

        db.add_all(sample_projects)
        db.commit()

        # 2. Seed Alerts
        sample_alerts = [
            Alert(
                alert_id="ALR-4821",
                project_id=1,
                type="Cost Anomaly",
                description="Expenditure exceeds sanctioned amount by 65%. Payment-progress mismatch.",
                risk_score=87,
                risk_level=RiskLevel.critical,
                detected_date=date(2024, 5, 2),
                status="Pending Review"
            ),
            Alert(
                alert_id="ALR-1932",
                project_id=2,
                type="Payment Anomaly",
                description="Expenditure ₹14.2L exceeds sanction ₹8.5L by 67%.",
                risk_score=84,
                risk_level=RiskLevel.critical,
                detected_date=date(2024, 5, 1),
                status="Under Investigation"
            ),
            Alert(
                alert_id="ALR-7741",
                project_id=3,
                type="Duplicate Similarity",
                description="High similarity (94%) detected with another road project within 1.2km.",
                risk_score=81,
                risk_level=RiskLevel.critical,
                detected_date=date(2024, 4, 30),
                status="Flagged"
            )
        ]

        db.add_all(sample_alerts)
        db.commit()

        print("Database seeded successfully!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
