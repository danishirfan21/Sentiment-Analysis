import React, { useState } from 'react';

const SentimentForm = ({ onAnalyze }) => {
  const [text, setText] = useState('');

  const model = 'distilbert/distilbert-base-uncased-finetuned-sst-2-english';
  const authToken = process.env.REACT_APP_HF_TOKEN;

  async function query(data) {
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
    const result = await response.json();
    return result;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) alert('Please enter some text');
    if (!authToken)
      alert('Please set the REACT_APP_HF_TOKEN environment variable');
    query({ inputs: text }).then((response) => {
      const sentiments = response[0];

      const dominantSentiment = sentiments.reduce((prev, current) =>
        prev.score > current.score ? prev : current
      );
      dominantSentiment.text = text;
      onAnalyze(dominantSentiment);
    });
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
