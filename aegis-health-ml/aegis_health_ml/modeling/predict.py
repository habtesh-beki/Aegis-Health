import joblib
import pandas as pd
import numpy as np
from loguru import logger
from pathlib import Path


from aegis_health_ml.config import MODELS_DIR

def predict(input_data:dict, model_path: Path = MODELS_DIR , threshold: float = 0.4):
    """
    Docstring for predict
     Load a trained model and make predictions on input data.
     Args:
            input_data: DataFram containing features for prediction.
            model_path: Path to the trained model file.
            threshold: Probability threshold for classification.
    """
    logger.info("Loading model...")
    # model = joblib.load(model_path)
    model_dict = joblib.load(model_path)
    model = model_dict["model"]
    preprocessor = model_dict["preprocessor"] 

    df = pd.DataFrame([input_data])
    
    print(model_path)
    # Apply the SAME Feature Engineering logic used in features.py
    # Note: In a production system, this logic should be a shared function

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

    # Get Probability
    # We use the model to get the probability of class 1 (Diabetes)
    
    # Apply the preprocessor
    X_processed = preprocessor.transform(df)

    # Then predict
    prob = model.predict_proba(X_processed)[0][1]
    #  Apply Custom Threshold
    # We use 0.4 instead of 0.5 to be more 'cautious'
    prediction = 1 if prob >= threshold else 0
    risk_level = "High Risk" if prediction == 1 else "Low/Standard Risk"

    return {
        "risk_probability": round(float(prob) * 100, 2),
        "prediction": int(prediction),
        "risk_level": risk_level
    }


if __name__ == "__main__":
    sample_input = {
        "Pregnancies": 1,
        "Glucose": 178,
        "BloodPressure": 88,
        "SkinThickness": 34,
        "Insulin": 125,
        "BMI": 36.2,
        "DiabetesPedigreeFunction": 0.512,
        "Age": 48
        }
    result = predict(sample_input)
    
    if result:
        print(f"--- Prediction Results ---")
        print(f"Risk Probability: {result['risk_probability']}%")
        print(f"Status: {result['risk_level']}")
        print(f"Prediction : {result['prediction']}")

