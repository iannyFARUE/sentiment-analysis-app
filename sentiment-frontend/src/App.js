import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [confidence, setConfidence] = useState(null);

  const predictSentiment = () => {
    axios
      .post("http://localhost:8000/predict", { text: review })
      .then((response) => {
        setSentiment(response.data.sentiment);
        setConfidence(response.data.confidence);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <div className="App">
      <h1>Sentiment Analysis</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <br />
      <button onClick={predictSentiment}>Predict Sentiment</button>
      {sentiment && (
        <div className="result">
          <h2>Sentiment: {sentiment}</h2>
          <h3>Confidence: {(confidence * 100).toFixed(1)}%</h3>
        </div>
      )}
    </div>
  );
}

export default App;
