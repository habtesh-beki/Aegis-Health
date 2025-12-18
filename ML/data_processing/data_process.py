import pandas as pd
import numpy as np
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(BASE_DIR, "..", "data", "raw", "diabetes.csv")

def read_data(file_path: str) -> pd.DataFrame:
    """Read data from a CSV file"""
    return pd.read_csv(file_path)

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Clean the data by handling invalid zero values and missing values"""
    
    invalid_zero_cols = [
        "Glucose",
        "BloodPressure",
        "SkinThickness",
        "Insulin",
        "BMI"
    ]

    df = df.copy()

    for col in invalid_zero_cols:
        df[col] = df[col].replace(0, np.nan)
        df[col] = df[col].fillna(df[col].median())

    return df



# data = read_data(data_path)

# print(f"data before cleaning:\n{data[:10]}")
# cleand_data = clean_data(read_data(data_path))
# print(f"data after cleaning:\n{cleand_data[:10]}")