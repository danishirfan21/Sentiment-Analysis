import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SentimentForm from './components/SentimentForm';
import SentimentResult from './components/SentimentResult';

function App() {
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSentimentAnalysis = (text) => {
    setSentiment(text);
    setLoading(false);
    setError('');
  };

  const handleLoading = () => {
    setLoading(true);
  };

  const handleError = (message) => {
    setError(message);
    setLoading(false);
  };

  return (
    <div className="App">
      <Header />
      <SentimentForm
        onAnalyze={handleSentimentAnalysis}
        onLoading={handleLoading}
        onError={handleError}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <SentimentResult sentiment={sentiment} />
    </div>
  );
}

export default App;
