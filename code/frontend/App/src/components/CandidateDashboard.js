import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import LatestApplications from '../components/LatestApplications';
// import StatsChart from '../components/StatsChart';
import LatestArticles from '../components/LatestArticlesCandidat';



const CandidateDashboard = ({user}) => {
  return (
    <div className="home">
      <h1>Dashboard - Home</h1>
      <p>Welcome to the dashboard Candidate</p>
      <Cards />
      <LatestApplications />
      <LatestArticles />
    
    </div>
  );
};

export default CandidateDashboard;
