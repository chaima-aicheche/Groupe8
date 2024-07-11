import React from 'react';
import { Doughnut} from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

import statData from '../data/cards.json';

const StatsChart = () => {
    const chartData = {
        // labels: ['offres Candidatées', 'offres Acceptées', 'offres Refusées'],
        datasets: [
            {
                label: 'Statistiques de Candidature',
                data: [statData.appliedOffers, statData.acceptedOffers, statData.refusedOffers],
                backgroundColor: ['rgba(169, 169, 169, 0.95)', 'rgba(169, 169, 169, 0.5)', 'rgba(169, 169, 169, 0.3)'],
                padding: 0 ,
            }
        ]
    };

    const options = {
        layout: {
            padding: 0
        },
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              boxWidth: 10,
              padding: 20,
            }
          }
        }
      };

    return (
        <div className='stats'>
            <h4>Statistiques de candidatures</h4>
            <Doughnut data={chartData} options={options} />;
        </div>
    )
};

export default StatsChart;
