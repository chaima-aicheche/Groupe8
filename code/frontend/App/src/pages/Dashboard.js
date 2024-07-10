import React, { useState, useEffect } from 'react';
import CandidateDashboard from '../components/CandidateDashboard';
import RecruiterDashboard from '../components/RecruiterDashboard';
import '../styles/Dashboard.css';

import userData from '../data/user.json';

const Dashboard = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     fetch('/data/user.json')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then(data => setUser(data))

    //         .catch(error => setError(error.message));
    // }, []);

    useEffect(() => {
        setUser(userData);
    
    }, []);

    console.log(userData)

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user.role) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            {user.role === 'candidate' ? (
                <CandidateDashboard user={user}/>
            ) : (
                <RecruiterDashboard user={user} />
            )}

        </div>
    );
};

export default Dashboard;
