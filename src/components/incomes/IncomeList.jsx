import React from 'react';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const IncomeList = ({ incomes = [], onEdit, onDelete, loading, error }) => {
  if (loading) {
    return <LoadingSpinner className="py-8" />;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">error{error}</div>;
  }

  if (incomes.length === 0) {
    return <div className="text-center py-4 text-gray-600">No income found. Start adding a new income!</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              date
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Work
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {incomes.map((income) => (
            <tr key={income._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {income.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">
                + ₹{parseFloat(income.amount).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {income.source}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(income.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  onClick={() => onEdit(income)}
                  className="text-blue-600 hover:text-blue-900 bg-transparent hover:bg-blue-100 px-2 py-1 rounded-md text-xs"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(income._id)}
                  className="ml-2 text-red-600 hover:text-red-900 bg-transparent hover:bg-red-100 px-2 py-1 rounded-md text-xs"
                >
                 Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeList;
