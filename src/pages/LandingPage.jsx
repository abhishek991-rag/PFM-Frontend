import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in-down">
          Simplify your finances.
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl animate-fade-in-up">
          The easiest way to track income, expenses, budget and goals.
        </p>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row animate-fade-in-up delay-200">
          <Button
            onClick={handleLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform transition duration-300 hover:scale-105"
          >
            START NOW / LOGIN
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Track income</h3>
            <p className="text-gray-600">Keep track of all your earnings.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-red-600 mb-2">Manage Expenses</h3>
            <p className="text-gray-600">Categorize and analyze your expenses.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Budget and goals</h3>
            <p className="text-gray-600">Set and achieve financial goals.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;