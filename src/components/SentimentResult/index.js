import React from 'react';

const SentimentResult = ({ sentiment }) => {
  if (!sentiment) return null;
  const sentimentLabel = sentiment.label;
  const sentimentScore = (sentiment.score * 100).toFixed(2);

  const sentimentColorClass =
    sentimentLabel === 'POSITIVE' ? 'positive' : 'negative';

  return (
    <div className={`sentiment-result ${sentimentColorClass}`}>
      <h2>Sentiment: {sentimentLabel}</h2>
      <p>Confidence: {sentimentScore}%</p>
    </div>
  );
};

export default SentimentResult;
