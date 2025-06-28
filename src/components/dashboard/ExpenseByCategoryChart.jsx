import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseByCategoryChart = ({ data = {} }) => {
  if (
    !data ||
    Object.keys(data).length === 0 ||
    Object.values(data).every((val) => val === 0)
  ) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center h-80">
        <p className="text-gray-500">No expense data available.</p>
      </div>
    );
  }

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
          "#A0B4B7",
          "#5D4037",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
          "#A0B4B7",
          "#5D4037",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed) {
              label += `₹${context.parsed.toLocaleString()}`;
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        text: "Expense distribution",
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Expenses by category
      </h3>
      <div className="relative h-80">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ExpenseByCategoryChart;
