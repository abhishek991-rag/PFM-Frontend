import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Updated import path

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center z-10 sticky top-0">
      <div className="flex items-center">
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
        >
          FinTrack
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-700 font-medium hidden sm:block">
              Hello, {user.name || user.email}!
            </span>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-md hover:bg-gray-100"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Log out
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
