import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Articles from './Articles';
import Quiz from './Quiz';

const Training = () => {
  return (
    <div className="training">
      <nav>
        <ul>
          <li>
            <a href="/training/articles">Articles</a>
          </li>
          <li>
            <a href="/training/quiz">Quiz</a>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="articles" element={<Articles />} />
        <Route path="quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
};

export default Training;
