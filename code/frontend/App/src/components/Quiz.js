import React, { useState } from 'react';
import languagesData from './QuizData.json';
import './Quiz.css';

const Quiz = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [unlockedLevels, setUnlockedLevels] = useState(['easy']);
  const [reviewAnswers, setReviewAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const startQuiz = (language) => {
    setSelectedLanguage(language);
    setCurrentLevel('');
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setShowReview(false);
    setReviewAnswers([]);
  };

  const startLevel = (level) => {
    setCurrentLevel(level);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setShowReview(false);
    setReviewAnswers([]);
  };

  const handleAnswerOptionClick = (selectedAnswer) => {
    const questionData = languagesData.languagesData[selectedLanguage]?.levels.find(level => level.name === currentLevel)?.questions[currentQuestionIndex];
    if (!questionData) {
      return;
    }

    const correctAnswer = questionData.answer;

    const updatedReviewAnswers = [...reviewAnswers, { 
      question: questionData.question,
      selectedAnswer,
      correctAnswer
    }];
    setReviewAnswers(updatedReviewAnswers);

    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    const questionsLength = languagesData.languagesData[selectedLanguage]?.levels.find(level => level.name === currentLevel)?.questions.length;

    if (nextQuestionIndex < questionsLength) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
      const passingScore = (score + 1) / questionsLength * 100;
      if (passingScore >= 60) {
        if (currentLevel === 'easy' && !unlockedLevels.includes('medium')) {
          setUnlockedLevels([...unlockedLevels, 'medium']);
        } else if (currentLevel === 'medium' && !unlockedLevels.includes('hard')) {
          setUnlockedLevels([...unlockedLevels, 'hard']);
        }
      }
    }
  };

  const restartQuiz = () => {
    setSelectedLanguage('');
    setCurrentLevel('');
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setShowReview(false);
    setReviewAnswers([]);
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  const reviewQuiz = () => {
    setShowReview(true);
  };

  return (
    <div className="quiz-background">
      <div className="quiz-container">
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
        ) : !currentLevel ? (
          <div className="level-selection">
            <h2>Choisissez un niveau :</h2>
            <div className="level-buttons">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => startLevel(level)}
                  className={`btn btn-primary m-2 ${!unlockedLevels.includes(level) ? 'disabled' : ''}`}
                >
                  {level}
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
            ) : !showReview ? (
              <div className="score-section">
                <h1>Score final: {score}</h1>
                <button onClick={() => startLevel(currentLevel)} className="btn btn-primary m-2">Recommencer le niveau</button>
                <button onClick={restartQuiz} className="btn btn-primary m-2">Recommencer le quiz</button>
                <button onClick={navigateToHome} className="btn btn-primary m-2">Retour à l'accueil</button>
                <button onClick={reviewQuiz} className="btn btn-primary m-2">Revoir les réponses</button>
              </div>
            ) : (
              <div className="review-section">
                <h2>Révision des réponses</h2>
                {reviewAnswers.map((review, index) => (
                  <div key={index} className={`review-question ${review.selectedAnswer === review.correctAnswer ? 'correct-answer' : 'incorrect-answer'}`}>
                    <p>{review.question}</p>
                    <p>Votre réponse: {review.selectedAnswer}</p>
                    <p>Bonne réponse: {review.correctAnswer}</p>
                  </div>
                ))}
                <button onClick={restartQuiz} className="btn btn-primary m-2">Recommencer le quiz</button>
                <button onClick={navigateToHome} className="btn btn-primary m-2">Retour à l'accueil</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
