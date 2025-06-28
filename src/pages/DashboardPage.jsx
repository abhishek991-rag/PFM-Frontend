import React, { useEffect, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import LoadingSpinner from '../components/common/LoadingSpinner';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

import useExpenses from '../hooks/useExpenses';
import useIncomes from '../hooks/useIncomes';
import useBudgets from '../hooks/useBudgets';
import useGoals from '../hooks/useGoals';
import { useAuth } from '../hooks/useAuth';

import OverviewCards from '../components/dashboard/OverviewCards';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import ExpenseByCategoryChart from '../components/dashboard/ExpenseByCategoryChart';

const DashboardPage = () => {
  const { user } = useAuth();
  const { expenses, loading: expensesLoading, error: expensesError, fetchExpenses } = useExpenses();
  const { incomes, loading: incomesLoading, error: incomesError, fetchIncomes } = useIncomes();
  const { budgets, loading: budgetsLoading, error: budgetsError, fetchBudgets } = useBudgets();
  const { goals, loading: goalsLoading, error: goalsError, fetchGoals } = useGoals();

  const loading = expensesLoading || incomesLoading || budgetsLoading || goalsLoading;
  const error = expensesError || incomesError || budgetsError || goalsError;

  useEffect(() => {
    if (user) {
      fetchExpenses();
      fetchIncomes();
      fetchBudgets();
      fetchGoals();
    }
  }, [user, fetchExpenses, fetchIncomes, fetchBudgets, fetchGoals]);

  const totalIncome = useMemo(() => incomes.reduce((sum, income) => sum + income.amount, 0), [incomes]);
  const totalExpense = useMemo(() => expenses.reduce((sum, expense) => sum + expense.amount, 0), [expenses]);
  const netSavings = totalIncome - totalExpense;

  const expensesByCategory = useMemo(() => {
    const categories = {};
    expenses.forEach(exp => {
      categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });
    return categories;
  }, [expenses]);

  const recentTransactions = useMemo(() => {
    const allTransactions = [
      ...incomes.map(inc => ({ ...inc, type: 'income' })),
      ...expenses.map(exp => ({ ...exp, type: 'expense' }))
    ];
    return allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  }, [incomes, expenses]);

  const budgetStatus = useMemo(() => {
    const status = {};
    budgets.forEach(budget => {
      const spent = expenses.filter(exp =>
        exp.category === budget.category &&
        new Date(exp.date) >= new Date(budget.startDate) &&
        new Date(exp.date) <= new Date(budget.endDate)
      ).reduce((sum, exp) => sum + exp.amount, 0);

      status[budget.category] = {
        budgeted: budget.amount,
        spent: spent,
        remaining: budget.amount - spent,
        percentage: (spent / budget.amount) * 100
      };
    });
    return status;
  }, [budgets, expenses]);

  const goalProgress = useMemo(() => {
    return goals.map(goal => ({
      name: goal.name,
      targetAmount: goal.targetAmount,
      savedAmount: goal.savedAmount,
      percentage: Math.min((goal.savedAmount / goal.targetAmount) * 100, 100)
    }));
  }, [goals]);

  const incomeExpenseBarData = {
    labels: ['Income', 'Expense', 'Net Savings'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [totalIncome, totalExpense, netSavings],
        backgroundColor: [
          '#4CAF50',
          '#F44336',
          netSavings >= 0 ? '#2196F3' : '#FFC107',
        ],
        borderColor: [
          '#4CAF50',
          '#F44336',
          netSavings >= 0 ? '#2196F3' : '#FFC107',
        ],
        borderWidth: 1,
      },
    ],
  };

  const incomeExpenseBarOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Income vs. Expenses',
      },
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
        <p className="text-lg text-gray-600 ml-4">Loading dashboard data...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview {user ? `- ${user.name || user.email}` : ''}</h1>

          <OverviewCards
            totalIncome={totalIncome}
            totalExpenses={totalExpense}
            netSavings={netSavings}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ExpenseByCategoryChart data={expensesByCategory} />
            <RecentTransactions transactions={recentTransactions} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
             <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center">
                <div className="w-full h-80">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Total Income vs. Expenses</h2>
                    <Bar data={incomeExpenseBarData} options={incomeExpenseBarOptions} />
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Budget situation</h2>
                {Object.keys(budgetStatus).length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {Object.entries(budgetStatus).map(([category, data]) => (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800">{category}</h3>
                        <p className="text-sm text-gray-600">Budget: ₹{data.budgeted.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Cost: ₹{data.spent.toLocaleString()}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className={`h-2 rounded-full ${data.percentage > 90 ? 'bg-red-500' : data.percentage > 75 ? 'bg-orange-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min(data.percentage, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{data.percentage.toFixed(1)}% spent</p>
                        <p className={`text-md font-medium mt-2 ${data.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                         Balance: ₹{data.remaining.toLocaleString()}
                        </p>
                    </div>
                    ))}
                </div>
                ) : (
                <p className="text-gray-500">No active budgets found.</p>
                )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Goal Progression</h2>
            {goalProgress.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {goalProgress.map(goal => (
                  <div key={goal.name} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800">{goal.name}</h3>
                    <p className="text-sm text-gray-600">Target: ₹{goal.targetAmount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Saved: ₹{goal.savedAmount.toLocaleString()}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${goal.percentage >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${goal.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{goal.percentage.toFixed(1)}% get</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No financial targets were met.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

