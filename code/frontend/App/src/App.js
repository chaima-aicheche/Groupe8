import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Profile from './components/Profile';
import JobOffers from './components/JobOffers';
import Interviews from './components/Interviews';
import Planning from './components/Planning';
import Articles from './components/Articles';
import RecruiterProfile from './components/RecruiterProfile';
import Training from './components/Training';
import Quiz from './components/Quiz';
import TrainingArticles from './components/TrainingArticles';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recruiter-profile" element={<RecruiterProfile />} />
            <Route path="/job-offers" element={<JobOffers />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/interviews/planning" element={<Planning />} />
            <Route path="/interviews/articles" element={<Articles />} />
            <Route path="/training" element={<Training />} />
            <Route path="/training/quiz" element={<Quiz />} />
            <Route path="/training/articles" element={<TrainingArticles />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
