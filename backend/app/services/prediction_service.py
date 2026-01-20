from fastapi import status, HTTPException
from aegis_health_ml.modeling.predict import predict 

def create_prediction(payload: dict):
    # return predict(payload)
    try:
        result = predict(payload)
        if not result or "risk_probability" not in result or "risk_level" not in result:
            raise ValueError("Invalid prediction output")

        return result

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction failed: {str(e)}"
        )

