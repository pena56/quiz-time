import React from 'react';

import './style.css';

function Index({ score, correctAnswers }) {
  return (
    <div className="result">
      <p className="result__title">
        You got <span>{correctAnswers}</span> correct out of 10
      </p>
      <p className="result__point">Points Earned</p>
      <p className="result__score">{score}</p>
    </div>
  );
}

export default Index;
