import React from 'react';

const SentimentResult = ({ sentiment }) => {
  if (!sentiment) return null;
  const sentimentLabel = sentiment.label;
  const sentimentScore = (sentiment.score * 100).toFixed(2);

  const sentimentColor = sentimentLabel === 'POSITIVE' ? 'green' : 'red';
  return (
    <div
      style={{
        backgroundColor: sentimentColor,
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
      }}
    >
      <h2>Sentiment: {sentimentLabel}</h2>
      <p>Confidence: {sentimentScore}%</p>
    </div>
  );
};

export default SentimentResult;
