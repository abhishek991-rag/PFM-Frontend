import React from "react";

const OverviewCard = ({ title, amount, icon, colorClass }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 flex items-center justify-between`}
    >
      <div className="flex items-center">
        <span className={`text-3xl mr-4 ${colorClass}`}>{icon}</span>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">
            ₹{amount.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const OverviewCards = ({ totalIncome, totalExpenses, netSavings }) => {
  const income = totalIncome !== undefined ? totalIncome : 0;
  const expenses = totalExpenses !== undefined ? totalExpenses : 0;
  const savings = netSavings !== undefined ? netSavings : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <OverviewCard
        title="Total Income"
        amount={income}
        icon="💰"
        colorClass="text-green-600"
      />
      <OverviewCard
        title="Total Expenses"
        amount={expenses}
        icon="💸"
        colorClass="text-red-600"
      />
      <OverviewCard
        title="Net Savings"
        amount={savings}
        icon="📈"
        colorClass={savings >= 0 ? "text-blue-600" : "text-orange-600"}
      />
    </div>
  );
};

export default OverviewCards;
