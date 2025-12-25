# 🩺 Aegis Health: Type-2 Diabetes Risk Provider

Aegis Health is a production-ready machine learning platform designed to assist clinics and hospitals in screening for Type-2 Diabetes risk. Using the PIMA Indians dataset, the system provides a high-fidelity risk probability score rather than a binary diagnosis, emphasizing clinical decision support over automation.

---

## 🚀 Project Overview

This project addresses the critical need for **preventive screening** in small-to-medium-scale clinics. By analyzing 8 biometric indicators, Aegis Health allows healthcare providers to:

- **Stratify Patients:** Identify high-risk individuals before they become emergency cases.
- **Explainable AI:** Uses SHAP values to show _why_ a patient is at risk (e.g., High BMI + Age interaction).
- **Scale Operations:** Reduces the cost of unnecessary lab tests by acting as a digital pre-screener.

> **⚠️ Medical Disclaimer:** This project is for educational and research purposes only. It is not a diagnostic tool and should not replace professional medical judgment.

---

## 🏗️ System Architecture

The project follows a modular, decoupled architecture to ensure scalability and ease of deployment.

### Component Breakdown

- **ML Pipeline:** A specialized environment for data cleaning (imputing "hidden" zeros), feature engineering (BMI categorization), and model training using XGBoost.
- **Backend API:** A high-performance FastAPI service that serves predictions, handles input validation via Pydantic, and manages hospital-user authentication.
- **Frontend Dashboard:** A Next.js/Tailwind application providing an intuitive interface for clinicians to view patient history and risk trends.

---

## 📂 Repository Structure

```text
aegis-health/
├── ml/                 # Machine Learning Research & Training
│   ├── data/           # Raw and processed datasets
│   ├── features/       # Feature engineering & medical domain logic
│   ├── training/       # Model training scripts (XGBoost)
│   └── evaluation/     # Metrics (Recall-focused), SHAP, & Confusion Matrices
├── backend/            # FastAPI Production Server
│   ├── app/            # Core logic, routes, and Pydantic schemas
│   └── services/       # Model serving & business logic
├── frontend/           # Next.js 14 Dashboard
│   ├── app/            # Dashboard pages & layouts
│   └── components/     # Shadcn/UI & Recharts components
├── docker/             # Containerization for Backend & Frontend
└── docs/               # Ethics, Roadmap, and Compliance docs

```

---

## 🛠️ Tech Stack

- **Modeling:** Python, Scikit-Learn, XGBoost, SHAP.
- **Backend:** FastAPI, Pydantic, JWT Authentication.
- **Frontend:** Next.js 14, Tailwind CSS, Shadcn/UI, Tremor (Data Viz).
- **Infrastructure:** Docker, PostgreSQL (for patient history).

---

## 📈 Model Performance

We prioritize **Recall (Sensitivity)** because in healthcare, missing a high-risk patient (False Negative) is significantly more dangerous than a false alarm (False Positive).

| Metric                   | Score |
| ------------------------ | ----- |
| **Recall (Sensitivity)** | 84.5% |
| **ROC-AUC**              | 0.89  |
| **F1-Score**             | 0.82  |

---

## 🚦 Getting Started

### 1. Prerequisites

- Python 3.9+
- Docker & Docker Compose

### 2. Installation

```bash
# Clone the repository
git clone
cd aegis-health

# Spin up the entire stack (Frontend, Backend, Database)
docker-compose up --build

```

### 3. API Usage

```bash
# Example Prediction Request
curl -X POST "http://localhost:8000/predict" -H "Content-Type: application/json" -d '{
  "glucose": 145,
  "bmi": 32.5,
  "age": 45,
  "pregnancies": 2,
  ...
}'

```

---

## ⚖️ Ethics & Privacy

- **De-identified Data:** No Personally Identifiable Information (PII) is required for training or inference.
- **Bias Awareness:** Regular audits are performed to ensure model fairness across age and gender demographics.
- **Human-in-the-loop:** The system is designed to provide "Risk Probability" to a human doctor, not to make independent clinical decisions.

---

## 🗺️ Roadmap

- [ ] Add support for Heart Disease risk prediction.
- [ ] Implement HIPAA-compliant audit logging.
- [ ] Integrate with HL7/FHIR medical data standards.

---
