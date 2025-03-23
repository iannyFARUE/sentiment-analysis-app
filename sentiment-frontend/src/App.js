// src/App.js
import React, { useState } from "react";
import axios from "axios";
import { FaFilm } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import "./App.css";

function App() {
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const predictSentiment = () => {
    setLoading(true);
    setSentiment(null);

    axios
      .post("http://127.0.0.1:8000/predict", { text: review })
      .then((response) => {
        setSentiment(response.data.sentiment);
        setConfidence(response.data.confidence);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="header">
        <FaFilm size={40} color="#007BFF" />
        <h1>Movie Review Sentiment Analyzer</h1>
      </div>

      <textarea
        placeholder="🎬 Enter your movie review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button onClick={predictSentiment} disabled={loading || !review.trim()}>
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>

      {loading && (
        <div className="loader">
          <ClipLoader color="#007BFF" loading={loading} size={50} />
        </div>
      )}

      {sentiment && !loading && (
        <div className={`result ${sentiment.toLowerCase()}`}>
          <h2>Sentiment: {sentiment}</h2>
          <h3>Confidence: {(confidence * 100).toFixed(1)}%</h3>
        </div>
      )}
    </div>
  );
}

export default App;
