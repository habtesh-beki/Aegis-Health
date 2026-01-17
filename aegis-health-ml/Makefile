# Run the full data pipeline
data:
	python aegis-health-ml/aegis_health_ml/dataset.py
    python aegis-health-ml/aegis_health_ml/features.py

# Run the model training
train: data
	python aegis-health-ml/aegis_health_ml/modeling/train.py

# Clean up temporary files
clean:
	rm -rf data/interim/*
	rm -rf data/processed/*
	rm -rf models/*.joblib