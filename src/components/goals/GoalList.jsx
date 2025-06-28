import React from "react";
import GoalCard from "./GoalCard";
import LoadingSpinner from "../common/LoadingSpinner";

const GoalList = ({ goals = [], onEdit, onDelete, loading, error }) => {
  if (loading) {
    return <LoadingSpinner className="py-8" />;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  if (goals.length === 0) {
    return (
      <div className="text-center py-4 text-gray-600">
        No targets found. Start a new target!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal) => (
        <GoalCard
          key={goal._id}
          goal={goal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default GoalList;
