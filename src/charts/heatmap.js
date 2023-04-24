import React from 'react';
import Plot from 'react-plotly.js';
import '../Visualizations.module.css';

const Heatmap = ({ data }) => {
  const firstColumnName = Object.keys(data[0])[1];
  const secondColumnName = Object.keys(data[0])[2];
  
  const xLabels = Array.from(new Set(data.map(item => item[secondColumnName])));
  const yLabels = Array.from(new Set(data.map(item => item[firstColumnName])));

  const zData = new Array(yLabels.length).fill(0).map(() => new Array(xLabels.length).fill(0));

  data.forEach(item => {
    const xIndex = xLabels.indexOf(item[secondColumnName]);
    const yIndex = yLabels.indexOf(item[firstColumnName]);
    zData[yIndex][xIndex] = parseInt(item.count);
  });

  const canvasStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <div className={"chart-container"}>
      <h2 className={"title"}>Heat Map</h2>
      <Plot
        data={[
          {
            x: xLabels,
            y: yLabels,
            z: zData,
            type: 'heatmap',
            colorscale: 'Viridis',
          },
        ]}
        layout={{ width: '100%', height: '100%', title: 'Heatmap' }}
      />
    </div>
  );
};

export default Heatmap;
