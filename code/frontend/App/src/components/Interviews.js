// src/components/Interviews.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Planning from './Planning';
import Articles from './Articles';

const Interviews = () => {
  return (
    <div className="interviews">
      <h1>Interviews</h1>
      <nav>
        <ul>
          <li><Link to="planning">Planification</Link></li>
          <li><Link to="articles">Articles</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="planning" element={<Planning />} />
        <Route path="articles" element={<Articles />} />
      </Routes>
    </div>
  );
};

export default Interviews;
