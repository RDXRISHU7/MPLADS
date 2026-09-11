# MPLAD Sentinel - FastAPI Backend

AI-Powered Risk Intelligence Backend for MPLADS Implementation.

## 🚀 Features

- **FastAPI** framework with automatic interactive OpenAPI documentation (`/api/v1/docs`)
- **SQLAlchemy ORM** with PostgreSQL database support
- **Pydantic** models for strict data validation
- **RESTful Endpoints** for Projects, Risk Alerts, Vendors, MPs, and Analytics
- **Docker & Docker-Compose** ready for local development and cloud deployment

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- Python 3.10+
- PostgreSQL installed and running (or use Docker)

### 2. Setup Virtual Environment
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env` and adjust settings:
```bash
cp .env.example .env
```

### 5. Run Database Seeding
```bash
python seed_data.py
```

### 6. Start the API Server
```bash
uvicorn app.main:app --reload --port 8000
```
- API Docs: `http://localhost:8000/api/v1/docs`

---

## 🐳 Running with Docker

```bash
cd backend
docker-compose up --build
```

---

## ☁️ Cloud Deployment (Railway / Render)

1. Create a **PostgreSQL Database** on Railway/Render.
2. Deploy the `backend` folder as a **Web Service**.
3. Set the Environment Variable:
   - `DATABASE_URL` = your cloud PostgreSQL connection string
4. Your API will be live at `https://your-api.railway.app/api/v1`
