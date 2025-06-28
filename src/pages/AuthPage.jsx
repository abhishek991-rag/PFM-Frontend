import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      console.log('Login successful, navigating to dashboard.'); 
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed in AuthPage:', err); 
    }
  };

  const handleRegister = async (userData) => {
    console.log('handleRegister called in AuthPage with:', userData); 
    try {
      await register(userData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed in AuthPage:', err); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          {isLogin ? 'Login' : 'Register Now'}
        </h2>
        {isLogin ? (
          <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
        ) : (
          <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
        )}

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              console.log('Switching form from login to register (or vice versa)'); 
            }}
            className="text-blue-600 hover:text-blue-800 font-medium ml-1 focus:outline-none"
          >
            {isLogin ? 'Register Now' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
