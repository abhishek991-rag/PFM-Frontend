import React from "react";
import Button from "../common/Button";

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const { _id, name, targetAmount, savedAmount, targetDate, description } =
    goal;

  const percentageAchieved = Math.min((savedAmount / targetAmount) * 100, 100);
  const remainingAmount = targetAmount - savedAmount;
  const daysRemaining = Math.ceil(
    (new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  let progressBarColor = "bg-blue-500";
  if (percentageAchieved >= 100) {
    progressBarColor = "bg-green-500";
  } else if (daysRemaining <= 30 && percentageAchieved < 80) {
    progressBarColor = "bg-orange-500";
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-1">
          <span className="font-medium">Target amount:</span> ₹
          {parseFloat(targetAmount).toLocaleString()}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Saved so far:</span> ₹
          {parseFloat(savedAmount).toLocaleString()}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className={`${progressBarColor} h-2.5 rounded-full`}
            style={{ width: `${percentageAchieved}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          get: {percentageAchieved.toFixed(1)}%
        </p>

        <p className="text-lg font-bold text-gray-700">
          Balance: ₹{parseFloat(remainingAmount).toLocaleString()}
        </p>
        {daysRemaining > 0 && percentageAchieved < 100 && (
          <p className="text-sm text-gray-600 mt-2">
            Days left till target:{" "}
            <span className="font-semibold">{daysRemaining}</span>
          </p>
        )}
        {percentageAchieved >= 100 && (
          <p className="text-md font-semibold text-green-700 mt-2">
            Goal achieved!
          </p>
        )}
        {description && (
          <p className="text-sm text-gray-500 mt-4 italic">" {description} "</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button
          onClick={() => onEdit(goal)}
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

export default GoalCard;
