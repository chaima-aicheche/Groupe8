import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Articles from './Articles';
import Games from './Games';

const Training = () => {
  return (
    <div className="training">
      <nav>
        <ul>
          <li>
            <a href="/training/articles">Articles</a>
          </li>
          <li>
            <a href="/training/games">Games</a>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="articles" element={<Articles />} />
        <Route path="games" element={<Games />} />
      </Routes>
    </div>
  );
};

export default Training;
