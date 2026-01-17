# from pathlib import Path
import pandas as pd
from loguru import logger
from tqdm import tqdm
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer

tqdm.pandas()

from aegis_health_ml.config import INTERIM_DATA_DIR, PROCESSED_DATA_DIR


def build_features(input_path: str = INTERIM_DATA_DIR, output_path: str = PROCESSED_DATA_DIR):
    """
    Builds features from the interim dataset and save to processed data directory.
    """

    logger.info("Loading interim diabetes data...")
    df = pd.read_csv(input_path)
    logger.info("Interim diabetes data loaded successfully.")

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
    target = "Outcome"

    print(df.head())

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numerical_features),
            ("cat", OneHotEncoder(drop="first", sparse_output=False), categorical_features)
        ]
    )

    X = df.drop(columns=[target])
    y = df[target]

    logger.info("Transforming features...")
    preprocessor.set_output(transform="pandas")
    X_processed = preprocessor.fit_transform(X)
    logger.info("Features transformed successfully.")
   
    df_processed = pd.concat([X_processed, y.reset_index(drop=True)], axis=1)

    logger.info("Saving processed diabetes data...")
    df_processed.to_csv(output_path, index=False)
    logger.success("Processed diabetes data saved successfully.")

    return df_processed , preprocessor

if __name__ == "__main__":
    processed = build_features()
    print(processed.head())