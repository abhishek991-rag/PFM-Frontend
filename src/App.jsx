import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// All main page components are directly imported
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';
import BudgetPage from './pages/BudgetPage';
import GoalsPage from './pages/GoalsPage';
import ReportsPage from './pages/ReportsPage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Import AuthProvider and PrivateRoute
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute'; // Ensure this file is created

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route: Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Page */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes: Secured by PrivateRoute */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/incomes" element={<PrivateRoute><IncomePage /></PrivateRoute>} />
          <Route path="/expenses" element={<PrivateRoute><ExpensePage /></PrivateRoute>} />
          <Route path="/budgets" element={<PrivateRoute><BudgetPage /></PrivateRoute>} />
          <Route path="/goals" element={<PrivateRoute><GoalsPage /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />

          {/* 404 Not Found Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;