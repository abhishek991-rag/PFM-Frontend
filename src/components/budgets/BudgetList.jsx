import React from "react";
import BudgetCard from "./BudgetCard";
import LoadingSpinner from "../common/LoadingSpinner";

const BudgetList = ({
  budgets = [],
  currentExpenses = {},
  onEdit,
  onDelete,
  loading,
  error,
}) => {
  if (loading) {
    return <LoadingSpinner className="py-8" />;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">error{error}</div>;
  }

  if (budgets.length === 0) {
    return (
      <div className="text-center py-4 text-gray-600">
        No budgets found. Start a new budget!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {budgets.map((budget) => {
        const spentForBudget = currentExpenses[budget.category] || 0;

        return (
          <BudgetCard
            key={budget._id}
            budget={budget}
            currentSpent={spentForBudget}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default BudgetList;
