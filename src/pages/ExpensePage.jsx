import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import useExpenses from '../hooks/useExpenses';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ExpensePage = () => {
  const { expenses, loading, error, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleAddExpense = async (newExpenseData) => {
    setFormSubmitting(true);
    try {
      await addExpense(newExpenseData);
      setIsModalOpen(false);
      setEditingExpense(null);
    } catch (err) {
      console.error('Error adding expense:', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleUpdateExpense = async (updatedExpenseData) => {
    setFormSubmitting(true);
    try {
      await updateExpense(editingExpense._id, updatedExpenseData);
      setIsModalOpen(false);
      setEditingExpense(null);
    } catch (err) {
      console.error('Error updating expense:', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
      } catch (err) {
        console.error('Error deleting expense:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 main-content-area">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Expenses</h1>
            <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              ➕Add a new expense
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            {loading ? <LoadingSpinner className="py-8" /> : (
              <ExpenseList
                expenses={expenses}
                error={error}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
              />
            )}
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={editingExpense ? 'Edit Expense' : 'Add New Expense'}
          >
            <ExpenseForm
              initialData={editingExpense || {}}
              isEditing={!!editingExpense}
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              onClose={handleCloseModal}
              loading={formSubmitting}
            />
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default ExpensePage;