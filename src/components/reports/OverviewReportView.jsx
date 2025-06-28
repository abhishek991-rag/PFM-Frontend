import React, { useState, useEffect, useCallback } from 'react';
import ReportView from './ReportView';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const OverviewReportView = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOverviewData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [incomeResponse, expenseResponse] = await Promise.all([
        axios.get('/api/incomes'),
        axios.get('/api/expenses'),
      ]);

      const totalIncome = incomeResponse.data.reduce((sum, income) => sum + income.amount, 0);
      const totalExpense = expenseResponse.data.reduce((sum, expense) => sum + expense.amount, 0);
      const netSavings = totalIncome - totalExpense;

      const chartData = {
        labels: ['Total Income', 'Total Expenditure'],
        datasets: [
          {
            label: 'Amount',
            data: [totalIncome, totalExpense],
            backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      };

      setOverviewData({
        chartData,
        totalIncome,
        totalExpense,
        netSavings,
      });
    } catch (err) {
      console.error("Error fetching observation data:", err);
      setError('Failed to load observation data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverviewData();
  }, [fetchOverviewData]);

  if (loading) {
    return <LoadingSpinner className="py-8" />;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  if (!overviewData || (!overviewData.totalIncome && !overviewData.totalExpense)) {
    return <div className="text-center py-4 text-gray-600">There is no data available for the overview report.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Financial Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold text-blue-800">Total Income</p>
          <p className="text-2xl font-bold text-blue-700">₹{parseFloat(overviewData.totalIncome).toLocaleString()}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold text-red-800">Total Expenses</p>
          <p className="text-2xl font-bold text-red-700">₹{parseFloat(overviewData.totalExpense).toLocaleString()}</p>
        </div>
        <div className={`p-4 rounded-lg text-center ${overviewData.netSavings >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className="text-lg font-semibold text-gray-800">Net Savings/Loss</p>
          <p className={`text-2xl font-bold ${overviewData.netSavings >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            ₹{parseFloat(overviewData.netSavings).toLocaleString()}
          </p>
        </div>
      </div>
      <ReportView
        title="Income vs. Expenses"
        chartType="bar"
        data={overviewData.chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Income vs Expense Comparison',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '₹' + value.toLocaleString();
                }
              }
            },
          },
        }}
      />
    </div>
  );
};

export default OverviewReportView;
