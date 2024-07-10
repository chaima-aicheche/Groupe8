import React from 'react';
import LatestApplicationsData from '../data/applications.json';

const LatestApplications = () => {

    console.log(LatestApplicationsData);
    return (
        <div className="applications-container">
            <h3>Dernières Candidatures</h3>
            <ul>
                {LatestApplicationsData.slice(0, 5).map(app => (
                    <li key={app.id}>
                        <p>{app.title} - {app.company}</p>
                        <p>{app.date}</p>
                        <p>{app.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LatestApplications;
