// src/components/recruiter/StatsChart.js
import React from 'react';
import stats from '../data/genderStats.json';
import { Doughnut } from 'react-chartjs-2';

const StatsChart = () => {
    const data = {
        labels: ['Hommes', 'Femmes'],
        datasets: [
            {
                data: [stats.male, stats.female],
                backgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    return (
        <div className="chart-container">
            <h3>Pourcentages de Genres des Candidats</h3>
            <Doughnut data={data} />
        </div>
    );
};

export default StatsChart;
