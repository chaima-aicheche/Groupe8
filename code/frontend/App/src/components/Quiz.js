import React, { useState } from 'react';
import languagesData from './QuizData.json';
import './Quiz.css'; 

const Quiz = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const startQuiz = (language) => {
    setSelectedLanguage(language);
    setCurrentLevel('easy');
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  const handleAnswerOptionClick = (selectedAnswer) => {
    const questionData = languagesData.languagesData[selectedLanguage]?.levels.find(level => level.name === currentLevel)?.questions[currentQuestionIndex];
    if (!questionData) {
      return;
    }

    const correctAnswer = questionData.answer;

    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    const questionsLength = languagesData.languagesData[selectedLanguage]?.levels.find(level => level.name === currentLevel)?.questions.length;

    if (nextQuestionIndex < questionsLength) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      if (currentLevel === 'easy') {
        setCurrentLevel('medium');
      } else if (currentLevel === 'medium') {
        setCurrentLevel('hard');
      } else {
        setShowScore(true);
      }
      setCurrentQuestionIndex(0);
    }
  };

  const restartQuiz = () => {
    setSelectedLanguage('');
    setCurrentLevel('');
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  const navigateToHome = () => {

    window.location.href = '/';
  };

  return (
    <div className="container">
      {!selectedLanguage ? (
        <div className="language-selection">
          <h2>Choisissez un langage de programmation :</h2>
          <div className="language-buttons">
            {Object.keys(languagesData.languagesData).map((language) => (
              <button key={language} onClick={() => startQuiz(language)} className="btn btn-primary m-2">
                {language}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {!showScore ? (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestionIndex + 1}</span> / {languagesData.languagesData[selectedLanguage]?.levels.find(level => level.name === currentLevel)?.questions.length}
                </div>
                <div className="question-text">
                  {languagesData.languagesData[selectedLanguage]?.levels.find(level => level.name === currentLevel)?.questions[currentQuestionIndex]?.question}
                </div>
              </div>
              <div className="answer-section">
                {languagesData.languagesData[selectedLanguage]?.levels.find(level => level.name === currentLevel)?.questions[currentQuestionIndex]?.options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswerOptionClick(option)} className="btn btn-outline-primary m-2">
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="score-section">
              <h1>Score final: {score}</h1>
              <button onClick={restartQuiz} className="btn btn-primary m-2">Recommencer le quiz</button>
              <button onClick={navigateToHome} className="btn btn-primary m-2">Retour à l'accueil</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
