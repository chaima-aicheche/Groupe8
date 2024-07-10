import React from 'react';
import { Bar } from 'react-chartjs-2';

const StatsChart = ({ data }) => {
    const chartData = {
        labels: ['Candidatées', 'Refusées', 'Acceptées'],
        datasets: [
            {
                label: 'Statistiques de Candidature',
                data: [data.appliedOffers, data.refusedOffers, data.acceptedOffers],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)']
            }
        ]
    };

    return <Bar data={chartData} />;
};

export default StatsChart;
