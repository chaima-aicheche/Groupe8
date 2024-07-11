import React from 'react';
import LatestApplicationsData from '../data/applications.json';

const LatestApplications = () => {

    console.log(LatestApplicationsData);
    return (
        <div className="applications-container">
            <h4>Dernières Candidatures</h4>
            <div className='applications-list'>
                {LatestApplicationsData.slice(0, 5).map(app => (
                    <p key={app.id}>
                        <p>{app.title} - {app.company} - {app.date}</p>
                        {/* <p>{app.status}</p> */}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default LatestApplications;
