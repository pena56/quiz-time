import React from 'react';

import './style.css';

function Index({ question, answers, userAnswer, callback }) {
  return (
    <div className="quiz">
      <p
        className="quiz__question"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="quiz__options">
        {answers.map((answer, index) => (
          <button
            onClick={callback}
            key={index}
            className={`quiz__option ${
              answer === userAnswer?.correctAnswer
                ? 'correct__answer'
                : answer !== userAnswer?.correctAnswer &&
                  answer === userAnswer?.answer
                ? 'incorrect__answer'
                : null
            }`}
            value={answer}
            disabled={userAnswer}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Index;
