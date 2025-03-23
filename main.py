from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI(title="Complete Sentiment Pipeline API")

# Load your pipeline
pipeline = joblib.load("full_sentiment_pipeline.pkl")

class Review(BaseModel):
    text: str
    
@app.get("/")
def root():
    return {"message": "Welcome to Sentiment Analysis API"}


@app.post("/predict")
def predict(review: Review):
    prediction = pipeline.predict([review.text])[0]
    probability = pipeline.predict_proba([review.text]).max()
    sentiment_label = "Positive" if prediction == 1 else "Negative"
    
    return {
        "sentiment": sentiment_label,
        "confidence": round(float(probability), 3)
    }
