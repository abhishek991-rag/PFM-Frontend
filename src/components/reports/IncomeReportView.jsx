import React, { useState, useEffect, useCallback } from 'react';
import ReportView from './ReportView';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const IncomeReportView = () => {
  const [incomeData, setIncomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIncomes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/incomes');
      const incomes = response.data;

      const aggregatedData = incomes.reduce((acc, income) => {
        acc[income.source] = (acc[income.source] || 0) + income.amount;
        return acc;
      }, {});

      const labels = Object.keys(aggregatedData);
      const dataValues = Object.values(aggregatedData);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Income Amount',
            data: dataValues,
            backgroundColor: [
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(201, 203, 207, 0.7)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(201, 203, 207, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };
      setIncomeData(chartData);
    } catch (err) {
      console.error("Error fetching income data:", err);
      setError('Failed to load revenue data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  if (loading) {
    return <LoadingSpinner className="py-8" />;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <ReportView
      title="Earnings Report (as per source)"
      chartType="doughnut"
      data={incomeData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'income distribution',
          },
        },
      }}
    />
  );
};

export default IncomeReportView;
