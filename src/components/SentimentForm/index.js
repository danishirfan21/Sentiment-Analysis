import React, { useState } from 'react';

const SentimentForm = ({ onAnalyze, onLoading, onError }) => {
  const [text, setText] = useState('');

  const model = 'distilbert/distilbert-base-uncased-finetuned-sst-2-english';
  const authToken = process.env.REACT_APP_HF_TOKEN;

  async function query(data) {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return onError('Please enter some text');
    if (!authToken)
      return onError('Please set the REACT_APP_HF_TOKEN environment variable');
    onLoading();
    query({ inputs: text })
      .then((response) => {
        const sentiments = response[0];

        const dominantSentiment = sentiments.reduce((prev, current) =>
          prev.score > current.score ? prev : current
        );
        dominantSentiment.text = text;
        onAnalyze(dominantSentiment);
      })
      .catch((err) => onError(err.message));
  };

  return (
    <form className="sentiment-form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        rows="4"
        cols="50"
      />
      <button type="submit">Analyze</button>
    </form>
  );
};

export default SentimentForm;
