import React from 'react';

const Question = ({ question, onAnswerClick, totalQuestions, currentQuestion }) => {
  const { text, options, answer } = question;

  return (
    <div className="question-container">
      <h2>Question {currentQuestion + 1}/{totalQuestions}</h2>
      <p className="question-text">{text}</p>
      <div className="options-container">
        {options.map((option, index) => (
          <button key={index} className="option-button" onClick={() => onAnswerClick(option === answer)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
