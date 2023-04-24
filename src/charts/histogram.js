import React from 'react';
import { Bar } from 'react-chartjs-2';
import { LinearScale, CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import '../Visualizations.module.css';

Chart.register(LinearScale, CategoryScale);

const Histogram = ({ data, options }) => {
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    return <div>Error: Data is not an array</div>;
  }
  console.log(data, options);

  // Extract keys from the first data item, except the 'count' key
  const keys = Object.keys(data[0]).filter(key => key !== 'count');
  const labels = data.map(item => item[keys[0]]);
  const counts = data.map(item => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${keys[0]} Counts`,
        data: counts,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          // Add more colors if needed
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          // Add more colors if needed
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: options.title,
      },
      legend: {
        display: false,
      },
    },
  };

  const canvasStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <div className="chart-container">
      <h2 className="title">Histogram</h2>
      <Bar style={canvasStyle} data={chartData} options={chartOptions} />
    </div>
  );
};

export default Histogram;
