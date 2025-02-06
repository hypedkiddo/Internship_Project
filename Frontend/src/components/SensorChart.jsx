// SensorChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register necessary components with Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SensorChart = ({data}) => {
    // Keys for each sensor type
    const sensorKeys = ["CO", "Butane", "NH3", "Benzene", "CO2", "TVOC"];

    // Generate a chart for each sensor
    return (
        <div>
            {sensorKeys.map((sensor) => {
                const chartData = {
                    labels: data.map(entry => entry.place),
                    datasets: [
                        {
                            label: `${sensor} Levels`,
                            data: data.map(entry => entry[sensor]),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            barThickness: 100,
                        },
                    ],
                };

                const options = {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Level',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Place',
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                };

                return (
                    <div key={sensor} style={{ marginBottom: '20px' }}>
                        <h3>{sensor} Levels</h3>
                        <Bar data={chartData} options={options} />
                    </div>
                );
            })}
        </div>
    );
};

export default SensorChart;
