import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Profile from './components/Profile';
import JobOffers from './components/JobOffers';
import Interviews from './components/Interviews';
import Planning from './components/Planning';
import Articles from './components/Articles';
import Training from './components/Training';
import Games from './components/Games';
import TrainingArticles from './components/TrainingArticles';
import './styles/App.css';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/job-offers" element={<JobOffers />} />
            <Route path="/interviews" element={<Interviews />}>
              <Route path="planning" element={<Planning />} />
              <Route path="articles" element={<Articles />} />
            </Route>
            <Route path="/training" element={<Training />}>
              <Route path="games" element={<Games />} />
              <Route path="articles" element={<TrainingArticles />} />
            </Route>
          </Routes>
        </div>
      </div> 
    </Router>
  );
};

export default App;
