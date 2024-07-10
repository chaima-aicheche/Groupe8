import React from 'react';
import { Doughnut} from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

import statData from '../data/cards.json';

const StatsChart = () => {
    const chartData = {
        labels: ['Candidatées', 'Refusées', 'Acceptées'],
        datasets: [
            {
                label: 'Statistiques de Candidature',
                data: [statData.appliedOffers, statData.acceptedOffers, statData.refusedOffers],
                backgroundColor: ['rgba(169, 169, 169, 0.95)', 'rgba(169, 169, 169, 0.5)', 'rgba(169, 169, 169, 0.3)']
            }
        ]
    };

    const options = {
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              boxWidth: 20,
              padding: 20
            }
          }
        }
      };

    console.log(chartData);

    return <Doughnut data={chartData} options={options} />;
};

export default StatsChart;
