import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-9xl font-extrabold text-gray-800 animate-bounce">404</h1>
      <p className="text-2xl md:text-3xl font-light text-gray-700 mt-4 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
      >
       Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;