import os
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.join(BASE_DIR, "..")
os.sys.path.insert(0, parent_dir)

from data_processing.data_process import (
    read_data, clean_data
)
from feature_engineering.feature_engineering import (
    add_features , build_preprocessor
)
 
# Paths
RAW_DATA_PATH = os.path.join(BASE_DIR, "..", "data", "raw", "diabetes.csv")
PROCESSED_DATA_PATH =os.path.join(BASE_DIR, "..", "data", "processed", "diabetes_processed_v1.csv")
MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "diabetes_model_v1.pkl")
PREPROCESSOR_PATH = os.path.join(BASE_DIR, "..", "models", "preprocessor_v1.pkl")


def train():
    df = read_data(RAW_DATA_PATH)

    df = clean_data(df)

    df = add_features(df)

    preprocessor = build_preprocessor()

    X = df.drop("Outcome", axis=1)
    y= df["Outcome"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    X_train_processed = preprocessor.fit_transform(X_train)
    X_test_processed = preprocessor.transform(X_test)

    model = LogisticRegression(max_iter=100 , class_weight="balanced")
    model.fit(X_train_processed, y_train)

    y_pred = model.predict(X_test_processed)
    y_proba = model.predict_proba(X_test_processed)[:, 1]

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    print("ROC-AUC:", roc_auc_score(y_test, y_proba))

    # Save processed data (optional but recommended)
    os.makedirs(os.path.dirname(PROCESSED_DATA_PATH), exist_ok=True)
    df.to_csv(PROCESSED_DATA_PATH, index=False)

    # Save model & preprocessor
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    joblib.dump(preprocessor, PREPROCESSOR_PATH)

    print("\nTraining complete.")
    print(f"Model saved to: {MODEL_PATH}")
    print(f"Preprocessor saved to: {PREPROCESSOR_PATH}")


if __name__ == "__main__":
    train()

