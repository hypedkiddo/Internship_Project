import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const GasBarChart = ({ data, selectedPlace }) => {
    const GasBarChart = ({data,selectedPlace}) => {
  // Filter data for the selected place


  const placeData = data.find(item => item.place === selectedPlace);

  // Extract gas types and their values if the place exists
  const gasTypes = placeData ? ['CO', 'CO2', 'Ammonia', 'Benzene'] : [];
  const gasValues = placeData ? [placeData.co, placeData.co2, placeData.ammonia, placeData.benzene] : [];

  // Set up chart data and options
  const chartData = {
    labels: gasTypes,
    datasets: [
      {
        label: 'Gas Level (ppm)',
        data: gasValues,
        backgroundColor: ['#4f46e5', '#2563eb', '#059669', '#d97706'],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `Gas Levels in ${selectedPlace} (ppm)`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'PPM',
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {placeData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-600">No data available for the selected place.</p>
      )}
    </div>
  );
};

export default GasBarChart;
