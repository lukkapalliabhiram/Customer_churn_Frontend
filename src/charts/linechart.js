import React from 'react';
import { Line } from 'react-chartjs-2';
import '../Visualizations.module.css';

const LineChart = ({ data, options }) => {
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    return <div>Error: Data is not an array</div>;
  }
  console.log(data, options);

  // Extract keys from the first data item, except the 'count' key
  const keys = Object.keys(data[0]).filter(key => key !== 'count');
  const labels = data.map(item => item[keys[0]]);
  const counts = data.map(item => item.count);

  const canvasStyle = {
    width: '100%',
    height: '100%',
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${keys[0]} Counts`,
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.4,
        fill: false
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

  return (
    <div className="chart-container">
      <h2 className="title">Line Chart</h2>
      <Line style={canvasStyle} data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
