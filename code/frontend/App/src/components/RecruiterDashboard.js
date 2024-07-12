// src/pages/RecruiterDashboardPage.js
import React, { useEffect, useState } from 'react';
import OffersRecruiterStats from '../components/OffersRecruiterStats';
import GenderStats from '../components/GenderStats';

const RecruiterDashboard = () => {
    
    return (
        <div className="recruiter-dashboard-page">
            <h1>Dashboard - Home</h1>
            <p>Welcome to the dashboard Candidate</p>
            <OffersRecruiterStats />
            <GenderStats  />
        </div>
    );
};

export default RecruiterDashboard;
