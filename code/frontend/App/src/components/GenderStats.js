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
                backgroundColor: ['rgba(127, 0, 255)', 'rgba(127, 0, 255, 0.5)'],
            },
        ],
    };

    const options = {
        layout: {
            padding: 0
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              boxWidth: 10,
              padding: 20,
            }
          }
        }
      };


    return (
        <div className="stats-gender">
            <h3>Pourcentages de Genres des Candidats</h3>
            <Doughnut data={data} options={options}/>
        </div>
    );
};

export default StatsChart;
