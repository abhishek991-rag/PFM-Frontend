import React from "react";
import Button from "../common/Button";

const BudgetCard = ({ budget, currentSpent = 0, onEdit, onDelete }) => {
  const { _id, category, amount, startDate, endDate } = budget;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const percentageSpent = Math.min((currentSpent / amount) * 100, 100);
  const remainingAmount = amount - currentSpent;

  let progressBarColor = "bg-green-500";
  if (percentageSpent > 75) {
    progressBarColor = "bg-red-500";
  } else if (percentageSpent > 50) {
    progressBarColor = "bg-yellow-500";
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{category}</h3>
        <p className="text-gray-600 mb-1">
          <span className="font-medium">Duration:</span>{" "}
          {start.toLocaleDateString()} - {end.toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Budget amount:</span> ₹
          {parseFloat(amount).toLocaleString()}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className={`${progressBarColor} h-2.5 rounded-full`}
            style={{ width: `${percentageSpent}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          spent:{" "}
          <span className="font-semibold">
            ₹{parseFloat(currentSpent).toLocaleString()}
          </span>{" "}
          ({percentageSpent.toFixed(1)}%)
        </p>
        <p
          className={`text-lg font-bold ${
            remainingAmount >= 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          Balance: ₹{parseFloat(remainingAmount).toLocaleString()}
        </p>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button
          onClick={() => onEdit(budget)}
          className="text-blue-600 hover:text-blue-900 bg-transparent hover:bg-blue-100 px-2 py-1 rounded-md text-sm"
        >
          Edit
        </Button>
        <Button
          onClick={() => onDelete(_id)}
          className="ml-2 text-red-600 hover:text-red-900 bg-transparent hover:bg-red-100 px-2 py-1 rounded-md text-sm"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BudgetCard;
