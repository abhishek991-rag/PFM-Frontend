import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ReportView from '../components/reports/ReportView';
import useExpenses from '../hooks/useExpenses';
import useIncomes from '../hooks/useIncomes';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ReportsPage = () => {
  const { expenses, loading: expensesLoading, error: expensesError } = useExpenses();
  const { incomes, loading: incomesLoading, error: incomesError } = useIncomes();

  const loading = expensesLoading || incomesLoading;
  const error = expensesError || incomesError;

  const expenseSummaryData = useMemo(() => {
    const categories = {};
    expenses.forEach(exp => {
      categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });
    return {
      labels: Object.keys(categories),
      datasets: [{
        label: 'राशि (₹)',
        data: Object.values(categories),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED', '#A0B4B7', '#5D4037'
        ],
        hoverOffset: 4
      }]
    };
  }, [expenses]);

  const incomeSummaryData = useMemo(() => {
    const sources = {};
    incomes.forEach(inc => {
      sources[inc.source] = (sources[inc.source] || 0) + inc.amount;
    });
    return {
      labels: Object.keys(sources),
      datasets: [{
        label: 'राशि (₹)',
        data: Object.values(sources),
        backgroundColor: [
          '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
        ],
        hoverOffset: 4
      }]
    };
  }, [incomes]);

  const incomeVsExpenseData = useMemo(() => {
    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    return {
      labels: ['Total Income', 'Total Expenses'],
      datasets: [{
        label: 'Amount (₹)',
        data: [totalIncome, totalExpense],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['#4CAF50', '#F44336'],
        borderWidth: 1,
      }]
    };
  }, [incomes, expenses]);

  const incomeVsExpenseOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  };


  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="text-lg text-gray-600 ml-4">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <p className="text-lg text-red-600">error {error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 main-content-area">
        <Navbar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">report</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ReportView
              title="Expenses by category"
              chartType="doughnut"
              data={expenseSummaryData}
            />
            <ReportView
              title="Income by source"
              chartType="doughnut"
              data={incomeSummaryData}
            />
          </div>

          <div className="grid grid-cols-1 mb-8">
            <ReportView
              title="Total Income vs. Total Expenses"
              chartType="bar"
              data={incomeVsExpenseData}
              options={incomeVsExpenseOptions}
            />
          </div>

        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
