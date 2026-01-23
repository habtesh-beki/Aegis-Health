
FROM python:3.11-slim

# ---- system deps ----
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ---- install deps ----
COPY backend/requirements.txt /tmp/backend.txt
COPY aegis-health-ml/requirements.txt /tmp/ml.txt

RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir -r /tmp/backend.txt \
 && pip install --no-cache-dir -r /tmp/ml.txt

# ---- install ML package ----
COPY aegis-health-ml /app/aegis-health-ml
RUN pip install --no-cache-dir -e /app/aegis-health-ml

# ---- backend code ----
COPY backend /app/backend

# ---- env ----
ENV PYTHONPATH=/app/backend

WORKDIR /app/backend

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
