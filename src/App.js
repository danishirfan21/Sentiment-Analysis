import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SentimentForm from './components/SentimentForm';
import SentimentResult from './components/SentimentResult';

function App() {
  const [sentiment, setSentiment] = useState('');

  const handleSentimentAnalysis = (text) => {
    setSentiment(text);
  };

  return (
    <div className="App">
      <Header />
      <SentimentForm onAnalyze={handleSentimentAnalysis} />
      <SentimentResult sentiment={sentiment} />
    </div>
  );
}

export default App;
