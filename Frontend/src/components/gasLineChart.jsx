import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// Sample data for gas sensor values


// LineChart Component
const gasLineChart = ({data}) => {
  const chartData = {
    labels: data.map(record => record.time), // x-axis labels (time)
    datasets: [
      {
        label: 'Gas Value (ppm)',
        data: data.map(record => record.gasValue), // y-axis data (gas values)
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
        borderWidth: 2,
        tension: 0.3, // Smooth the line
        pointRadius: 5, // Size of the points
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gas Sensor Values Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Gas Value (ppm)',
        },
        min: 0, // Minimum value for y-axis
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

// Example usage of the LineChart component


export default gasLineChart;
