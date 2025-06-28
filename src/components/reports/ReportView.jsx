import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const ReportView = ({ title, chartType, data, options }) => {
  if (!data || Object.keys(data).length === 0 || !data.labels || data.labels.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-96 flex items-center justify-center">
        <p className="text-gray-500">No data available.</p>
      </div>
    );
  }

  const chartComponent = chartType === 'doughnut' ? Doughnut : Bar;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="relative h-80">
        {React.createElement(chartComponent, { data, options })}
      </div>
    </div>
  );
};

export default ReportView;

