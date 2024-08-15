// src/components/PieChart/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChartComponent = ({ data }) => {
  // Prepare data for the Pie chart
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0"
        ],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div style={{width:"40%"}}>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChartComponent;
