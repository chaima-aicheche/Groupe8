import React from 'react';
import LatestApplicationsData from '../data/applications.json';

const LatestApplications = () => {

    console.log(LatestApplicationsData);
    return (
        <div className="applications-container">
            <h3>Dernières Candidatures</h3>
            <ul className='applications-list'>
                {LatestApplicationsData.slice(0, 5).map(app => (
                    <a href=''><li key={app.id}>
                        <p>{app.title} - {app.company} - {app.date}</p>
                        <p>{app.status}</p>
                    </li></a>
                ))}
            </ul>
        </div>
    );
};

export default LatestApplications;
