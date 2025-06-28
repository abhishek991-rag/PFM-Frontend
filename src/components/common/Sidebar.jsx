import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Updated import path

const Sidebar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Expenses", path: "/expenses", icon: "💸" },
    { name: "Incomes", path: "/incomes", icon: "💰" },
    { name: "Budgets", path: "/budgets", icon: "🎯" },
    { name: "Goal", path: "/goals", icon: "📈" },
    { name: "Report", path: "/reports", icon: "📄" },
  ];

  if (!user) {
    return null; // If user is not logged in, sidebar should not be rendered
  }

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 p-2 rounded-md text-gray-700 bg-white shadow-md lg:hidden"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Overlay (when sidebar is open on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 p-5 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-2">📊</span>
            <span className="text-xl font-bold text-gray-800">FinTrack</span>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200
                      ${isActive ? "bg-blue-500 text-white shadow-md" : ""}`
                    }
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-4 border-t border-gray-200 text-center">
            {user && (
              <p className="text-sm text-gray-600">
                Log in
                <br /> **{user.name || user.email}**
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
