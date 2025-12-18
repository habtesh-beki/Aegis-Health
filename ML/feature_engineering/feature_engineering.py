import sys
import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.join(BASE_DIR, "..")  # Go up to ML directory
sys.path.insert(0, parent_dir)

from data_processing.data_process import (read_data, clean_data)

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# 2. Go up one level to 'ml/', then into 'data/raw/'
data_path = os.path.join(BASE_DIR, "..", "data", "raw", "diabetes.csv")

def add_features(df: pd.DataFrame) -> pd.DataFrame:
     df = df.copy()

     # IBM categorical features
     df["BMI_Category"] = pd.cut(
            df["BMI"],
            bins=[0, 18.5, 25, 30, np.inf],
            labels=["Underweight", "Normal", "Overweight", "Obese"]
       )

    # Age groups
     df["Age_Group"] = pd.cut(
        df["Age"],
        bins=[0, 30, 45, 60, np.inf],
        labels=["Young", "Middle", "Senior", "Elder"]
      )

    # High glucose flag
     df["High_Glucose"] = (df["Glucose"] >= 140).astype(int)

     return df


def build_preprocessor():
    categorical_features = ["BMI_Category", "Age_Group"]
    numerical_features = [
        "Pregnancies",
        "Glucose",
        "BloodPressure",
        "SkinThickness",
        "Insulin",
        "BMI",
        "DiabetesPedigreeFunction",
        "Age",
        "High_Glucose"
    ]

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numerical_features),
            ("cat", OneHotEncoder(drop="first"), categorical_features)
        ]
    )

    return preprocessor

