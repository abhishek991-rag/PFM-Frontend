import React from "react";

const RecentTransactions = ({ transactions = [] }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Recent Transactions
        </h3>
        <p className="text-gray-600">No recent transactions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Recent Transactions
      </h3>
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="py-3 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-800 font-medium">
                {transaction.description}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
            <p
              className={`font-bold ${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "expense" ? "-" : "+"}
              {parseFloat(transaction.amount).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
