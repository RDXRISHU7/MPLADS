# MPLAD Sentinel — Track. Detect. Act.

[![Vercel Deployment Ready](https://img.shields.io/badge/Vercel-Ready-black?style=flat&logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vitejs.dev)

**MPLAD Sentinel** is an AI-powered monitoring, compliance, and risk-intelligence decision-support platform for the **Members of Parliament Local Area Development Scheme (MPLADS)**.

It provides District Authorities, State Nodal Authorities, and Ministry Officials with real-time visibility into project lifecycles, expenditure patterns, duplicate work detection, compliance benchmarks, and automated report generation.

---

## 🏛️ Core Features

- **Executive Monitoring Dashboard**: Real-time KPI summaries, risk distribution donut charts, monthly high-risk trends, priority alert feeds, and district risk rankings.
- **Interactive Project Portfolio**: Filterable project register with risk score pills, category tags, sanction amounts, and full drill-down.
- **Deep-Dive Project Detail & AI Risk Explanation**: 3-column analytical view with risk gauges, component factor breakdowns, expandable reference benchmark comparisons, and 6-stage chronological progress timelines.
- **Risk Alerts Engine**: Categorized investigation inbox (Critical, High, Medium, Resolved) with immediate action triggers (*Investigate*, *Assign*, *Mark Resolved*).
- **Expenditure Analytics**: Financial monitoring with sanction vs expenditure comparisons, category distribution donuts, horizontal constituency spend charts, and anomaly indicators.
- **Rule-Based Compliance Checks**: Automated tracking across MPLADS guidelines (tendering, photo verification, milestone verification, utilization certificates, cost caps).
- **Duplicate & Overlap Detection**: Side-by-side comparative analysis with text, GPS, contractor, and timeline similarity indexes.
- **Advanced Model Analytics**: Precision-recall curves, risk factor feature weights, model calibration charts, and explainability audit logs.
- **Geographic Grid (India Tile Map)**: Interactive state risk grid with district drawer breakdown and quick filtering.
- **Vendor & MP Constituency Intelligence**: Contractor delay profiling, concentration analysis, and constituency project risk tracking with slide-over drawers.
- **Standardized Report Generation**: Async simulated generation with export support for PDF, CSV, and XLS formats.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript (Strict Mode with `verbatimModuleSyntax`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), Google Fonts (`Inter`, `JetBrains Mono`)
- **Visualizations**: Recharts (Donuts, Line Charts, Bar Charts, Radar, Gauges)
- **Icons**: Lucide React
- **Build Tool**: Vite 8

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📦 How to Push to GitHub & Deploy on Vercel

### Step 1: Initialize Git and Commit
```bash
git init
git add .
git commit -m "feat: complete MPLAD Sentinel decision-support platform"
```

### Step 2: Push to GitHub
```bash
# Create a repository on github.com, then:
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New..."** > **"Project"**.
3. Import your GitHub repository.
4. Framework preset will automatically be detected as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

The project includes `vercel.json` and strict TypeScript configuration guaranteeing zero build or runtime errors.

---

## ⚖️ Ethical AI & Disclaimer

*MPLAD Sentinel is an AI-powered decision-support system. Risk indicators, anomaly detections, and compliance flags are intended solely to assist authorized officials in prioritization and field verification. They do not constitute findings of wrongdoing, negligence, or fraud.*
