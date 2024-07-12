import React from 'react';
import data from '../data/offresStatsRecuiter.json';

const OffersRecruiterStats = () => {
    return (
        <div className="dashboard-cards-recruiter chart-articles">
            <div className="card-Recruiter">
                <h3>Total d'Offres Publiées</h3>
                <p>{data.totalJobs}</p>
            </div>
            <div className="card-Recruiter">
                <h3>Total de Candidatures Reçues</h3>
                <p>{data.totalApplications}</p>
            </div>
            <div className="card-Recruiter">
                <h3>Candidatures en Cours de Traitement</h3>
                <p>{data.inProgressApplications}</p>
            </div>
            <div className="card-Recruiter">
                <h3>Candidatures Acceptées</h3>
                <p>{data.acceptedApplications}</p>
            </div>
            <div className="card-Recruiter">
                <h3>Candidatures Refusées</h3>
                <p>{data.rejectedApplications}</p>
            </div>
        </div>
    );
};

export default OffersRecruiterStats;