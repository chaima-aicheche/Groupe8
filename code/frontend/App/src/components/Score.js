import React from 'react';

const Score = ({ score, totalQuestions, onRestartQuiz, onBackToHome }) => {
  const successPercentage = (score / totalQuestions) * 100;

  return (
    <div className="score-container">
      <h2>Résultats du Quiz</h2>
      <p>Score: {score} / {totalQuestions}</p>
      <p>Taux de réussite: {successPercentage.toFixed(2)}%</p>
      <div className="score-buttons">
        <button className="restart-button" onClick={onRestartQuiz}>Recommencer</button>
        <button className="back-button" onClick={onBackToHome}>Retour à l'accueil</button>
      </div>
    </div>
  );
};

export default Score;
