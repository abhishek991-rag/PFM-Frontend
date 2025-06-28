import React, { useState, useEffect, useCallback } from 'react';
import ReportView from './ReportView';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const ExpenseReportView = () => {
  const [expenseData, setExpenseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/expenses');
      const expenses = response.data;

      const aggregatedData = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {});

      const labels = Object.keys(aggregatedData);
      const dataValues = Object.values(aggregatedData);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Expense Amount',
            data: dataValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(199, 199, 199, 0.7)',
              'rgba(83, 102, 255, 0.7)',
              'rgba(201, 203, 207, 0.7)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)',
              'rgba(83, 102, 255, 1)',
              'rgba(201, 203, 207, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };
      setExpenseData(chartData);
    } catch (err) {
      console.error("Error fetching expense data:", err);
      setError('Failed to load expense data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  if (loading) {
    return <LoadingSpinner className="py-8" />;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <ReportView
      title="Expense Report (Category wise)"
      chartType="doughnut"
      data={expenseData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Expense distribution',
          },
        },
      }}
    />
  );
};

export default ExpenseReportView;