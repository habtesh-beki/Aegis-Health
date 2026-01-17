from pathlib import Path
import pandas as pd
import numpy as np
from sklearn.impute import KNNImputer

from loguru import logger
from tqdm import tqdm
# import typer

from aegis_health_ml.config import RAW_DATA_DIR, INTERIM_DATA_DIR


def clean_diabetes_data(input_path: Path = RAW_DATA_DIR, output_path: Path = INTERIM_DATA_DIR): 
    """
    Transforms raw PIMA data to interim by handling '0' values 
    that are physically impossible.
    """

    logger.info("Loading raw diabetes data...")
    df = pd.read_csv(input_path)
    logger.info("Raw diabetes data loaded successfully.")

    # Replace 0 values with NaN for columns where 0 is not a valid value
    columns_to_replace = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
    for col in columns_to_replace:
        df[col] = df[col].replace(0, np.nan)

    # weights='distance' gives more importance to patients who are more similar.
    logger.info("Starting KNN Imputation (this may take a moment)...")
    imputer = KNNImputer(n_neighbors=5, weights="distance")

    # Impute the missing values
    df = pd.DataFrame(imputer.fit_transform(df), columns=df.columns)

    # Save the cleaned data
    logger.info("Saving cleaned diabetes data...")
    df.to_csv(output_path, index=False)
    logger.success("Diabetes data cleaned and saved successfully.")

    return df

if __name__ == "__main__":
   cleaned_data = clean_diabetes_data()
   print(cleaned_data.head())