import React from 'react';
import { Pie } from 'react-chartjs-2';
import '../Visualizations.module.css';

const PieChart = ({ data, options }) => {
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
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: options.title,
      },
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="title">Pie Chart</h2>
      <Pie style={canvasStyle} data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
