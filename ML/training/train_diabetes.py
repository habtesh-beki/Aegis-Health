import os
import pandas as pd
from sklearn.model_selection import train_test_split

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
PROCESSED_DATA_PATH = "ml/data/processed/diabetes_processed_v1.csv"
MODEL_PATH = "ml/models/diabetes_model_v1.pkl"
PREPROCESSOR_PATH = "ml/models/preprocessor_v1.pkl"


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

# data = train()
# print(f"Training data sample:\n{data[:10]}")
