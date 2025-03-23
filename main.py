from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Complete Sentiment Pipeline API")

# Load your pipeline
pipeline = joblib.load("full_sentiment_pipeline.pkl")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
