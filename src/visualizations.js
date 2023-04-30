import React, { useState } from 'react';
import BarChart from './charts/barchart';
import PieChart from './charts/piechart';
import StackedBarChart from './charts/stackedbarchart';
import LineChart from './charts/linechart';
import Heatmap from './charts/heatmap';
import ScatterPlot from './charts/scatterplot';
import Histogram from './charts/histogram';
import Select from 'react-select'; 
// ... import other chart components
import styles from './Visualizations.module.css';

const initialChartData = {
  labels: [],
  datasets: [],
};

const initialChartOptions = {};

const Visualizations = () => {
  const [chartType, setChartType] = useState('');
  const [column1, setColumn1] = useState('');
  const [column2, setColumn2] = useState('');
  const [chartData, setChartData] = useState(initialChartData);
  const [chartOptions, setChartOptions] = useState(initialChartOptions);
  const [selectedFilter, setSelectedFilter] = useState('defaultFilter');
  const [submitted, setSubmitted] = useState(false);


  const columnsByChartType = (chartType) => {
    const categoricalColumns = [
      { value: 'gender', label: 'Gender' },
      { value: 'seniorcitizen', label: 'Senior Citizen' },
      { value: 'partner', label: 'Partner' },
      { value: 'dependents', label: 'Dependents' },
      { value: 'phoneservice', label: 'Phone Service' },
      { value: 'multiplelines', label: 'Multiple Lines' },
      { value: 'internetservice', label: 'Internet Service' },
      { value: 'onlinesecurity', label: 'Online Security' },
      { value: 'onlinebackup', label: 'Online Backup' },
      { value: 'deviceprotection', label: 'Device Protection' },
      { value: 'techsupport', label: 'Tech Support' },
      { value: 'streamingtv', label: 'Streaming TV' },
      { value: 'streamingmovies', label: 'Streaming Movies' },
      { value: 'contract', label: 'Contract' },
      { value: 'paperlessbilling', label: 'Paperless Billing' },
      { value: 'paymentmethod', label: 'Payment Method' },
      { value: 'churn', label: 'Churn' },
    ];

    const timeBasedColumns = [
      { value: 'year', label: 'Year' },
      { value: 'month', label: 'Month' },
    ];

    const continuousColumns = [
      { value: 'tenure', label: 'Tenure' },
      { value: 'monthlycharges', label: 'Monthly Charges' },
      { value: 'totalcharges', label: 'Total Charges' },
    ];

    switch (chartType) {
      case 'bar':
      case 'pie':
        return {
          primary: categoricalColumns,
        };
      case 'stackedBar':
      case 'heatmap':
        return {
          primary: categoricalColumns,
          secondary: categoricalColumns,
        };
      case 'line':
        return {
          primary: categoricalColumns,
          secondary: continuousColumns,
        };
      case 'scatterplot':
        return {
          primary: continuousColumns,
          secondary: continuousColumns,
        };
      case 'histogram':
        return {
          primary: continuousColumns,
        };
      default:
        return {
          primary: [],
          secondary: [],
        };
    }
  };


  const chartTypes = [
    { value: '', label: 'Select chart type...' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'stackedBar', label: 'Stacked Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'heatmap', label: 'Heatmap' },
    { value: 'scatterplot', label: 'Scatter Plot' },
    { value: 'histogram', label: 'Histogram' },
  ];


  const renderSelectOptions = (columns) => {
    return columns.map((column) => ({
      value: column.value,
      label: column.label,
    }));
  };


  const getChartData = async (chartType, column1, column2) => {
    try {
      const response = await fetch(`https://customer-churn-ctln.onrender.com/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chartType,
          column1,
          column2,
        }),
      });
      const { data, options } = await response.json();

      return {
        data,
        options,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        data: null,
        options: null,
      };
    }
  };


  const fetchData = async () => {
    // Fetch data from the backend API using the selected filter criteria
    const { data, options } = await getChartData(selectedFilter);

    // Format the data according to your chart library's requirements
    // ...

    if (!data || !options) {
      return {
        data: initialChartData,
        options: initialChartOptions,
      };
    }

    return {
      data,
      options,
    };
  };

  const handleReset = () => {
    setChartType('');
    setColumn1('');
    setColumn2('');
    setChartData(initialChartData);
    setChartOptions(initialChartOptions);
    setSubmitted(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (chartType === 'stackedBar' || chartType === 'heatmap' || chartType === 'line' || chartType === 'scatterplot') {
      if (column1 === '' || column2 === '') {
        alert('Please select both columns.');
        return;
      }
    } else if (column1 === '') {
      alert('Please select a column.');
      return;
    }
  
    const { data, options } = await getChartData(chartType, column1, column2);
    setChartData(data);
    setChartOptions(options);
    setSubmitted(true); // Set submitted to true after fetching data and options
  };
  


  const renderChart = () => {
    if (!submitted) return null; // Do not render the chart if not submitted
  
    if (chartType === 'bar') {
      return <BarChart data={chartData} options={chartOptions} />;
    } else if (chartType === 'pie') {
      return <PieChart data={chartData} options={chartOptions} />;
    } else if (chartType === 'stackedBar') {
      return <StackedBarChart data={chartData} options={chartOptions} />;
    } else if (chartType === 'line') {
      return <LineChart data={chartData} options={chartOptions} />;
    } else if (chartType === 'heatmap') {
      return <Heatmap data={chartData} options={chartOptions} />;
    } else if (chartType === 'scatterplot') {
      return <ScatterPlot data={chartData} options={chartOptions} />;
    } else if (chartType === 'histogram') {
      return <Histogram data={chartData} options={chartOptions} />;
    }
  };
  

  const columns = columnsByChartType(chartType);

  return (
    <div className={styles["container"]}>
      <h2 className={styles["heading"]}>Visualizations</h2>
      <form onSubmit={handleSubmit} className={styles["formWrapper"]}>
        <label htmlFor="chart-type" className={styles["label"]}>Chart Type:</label>
        <Select
          id="chart-type"
          options={chartTypes}
          value={{ value: chartType, label: chartTypes.find(type => type.value === chartType)?.label }}
          onChange={(selectedOption) => setChartType(selectedOption.value)}
          className={styles["select"]}
        />
        <br />
        <label htmlFor="column1" className={styles["label"]}>Column 1:</label>
        <Select
          id="column1"
          options={renderSelectOptions(columns.primary)}
          value={{ value: column1, label: columns.primary.find(column => column.value === column1)?.label }}
          onChange={(selectedOption) => setColumn1(selectedOption.value)}
          className={styles["select"]}
        />
        <br />
        {columns.secondary && columns.secondary.length > 0 && (
          <>
            <label htmlFor="column2" className={styles["label"]}>Column 2:</label>
            <Select
              id="column2"
              options={renderSelectOptions(columns.secondary)}
              value={{ value: column2, label: columns.secondary.find(column => column.value === column2)?.label }}
              onChange={(selectedOption) => setColumn2(selectedOption.value)}
              className={styles["select"]}
            />
            <br />
          </>
        )}
        <button type="submit" className={styles["button"]}>Generate Chart</button>
        <button type="button" onClick={handleReset} className={styles["button"]}>Reset</button>
      </form>
      <div className={styles["chart"]}>{renderChart()}</div>
    </div>
  );
};

export default Visualizations;
