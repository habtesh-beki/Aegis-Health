from pathlib import Path
from loguru import logger
import json
import pandas as pd

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline
import joblib

from aegis_health_ml.config import MODELS_DIR, PROCESSED_DATA_DIR
from aegis_health_ml.features import build_features

def train_model(
    input_path: Path = PROCESSED_DATA_DIR,
    model_output_path: Path = MODELS_DIR / "diabetes_model.joblib",
):
    logger.info("Loading dataset...")
    df = pd.read_csv(input_path)
    
    X = df.drop(columns=["Outcome"])
    y = df["Outcome"]

    logger.info("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.2,
        stratify=y,
        random_state=42
    )

    logger.info("Applying SMOTE (training set only)...")
    smote = SMOTE(random_state=42)
    X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

    model = RandomForestClassifier(
        n_estimators=300,
        max_depth=None,
        min_samples_leaf=5,
        random_state=42,
        n_jobs=-1
    )

    logger.info("Running cross-validation (ROC-AUC)...")
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores = cross_val_score(
        model, X_train_res, y_train_res,
        scoring="roc_auc",
        cv=cv
    )
    # import preprocessor from features.py
    preprocessor = build_features()[1]

    # ////////////
    logger.info(f"CV ROC-AUC: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

    logger.info("Training final model...")
    model.fit(X_train_res, y_train_res)

    logger.info("Evaluating on test set...")
    y_prob = model.predict_proba(X_test)[:, 1]
    y_pred = (y_prob >= 0.5).astype(int)

    auc = roc_auc_score(y_test, y_prob)
    report = classification_report(y_test, y_pred, output_dict=True)

    logger.success(f"Test ROC-AUC: {auc:.4f}")
    print("\nClassification Report:\n", report)

    MODELS_DIR.mkdir(parents=True, exist_ok=True)

    # joblib.dump(
    #     {
    #         "model": model,
    #         "features": list(X.columns),
    #         "auc": auc,
    #         "cv_auc_mean": cv_scores.mean(),
    #     },
    #     model_output_path
    # )
    joblib.dump({"model": model, "preprocessor": preprocessor}, model_output_path)


    with open(MODELS_DIR / "metrics.json", "w") as f:
        json.dump(report, f, indent=2)

    logger.success(f"Model saved to {model_output_path}")


if __name__ == "__main__":
    train_model()
