import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336'],
        hoverBackgroundColor: ['#45a049', '#e68a00', '#1e88e5', '#d32f2f'],
      },
    ],
  };

  return (
    <div className="flex justify-center items-center">
      <Pie data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default DonutChart;