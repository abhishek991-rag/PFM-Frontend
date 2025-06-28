import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import BudgetForm from '../components/budgets/BudgetForm';
import BudgetList from '../components/budgets/BudgetList';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import useBudgets from '../hooks/useBudgets';
import useExpenses from '../hooks/useExpenses';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BudgetPage = () => {
  const { budgets, loading: budgetsLoading, error: budgetsError, addBudget, updateBudget, deleteBudget } = useBudgets();
  const { expenses, loading: expensesLoading, error: expensesError, fetchExpenses } = useExpenses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const currentExpensesByCategory = useMemo(() => {
    const expensesMap = {};
    expenses.forEach(exp => {
      expensesMap[exp.category] = (expensesMap[exp.category] || 0) + exp.amount;
    });
    return expensesMap;
  }, [expenses]);

  const handleAddBudget = async (newBudgetData) => {
    setFormSubmitting(true);
    try {
      await addBudget(newBudgetData);
      setIsModalOpen(false);
      setEditingBudget(null);
    } catch (err) {
      console.error('Error adding budget:', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const handleUpdateBudget = async (updatedBudgetData) => {
    setFormSubmitting(true);
    try {
      await updateBudget(editingBudget._id, updatedBudgetData);
      setIsModalOpen(false);
      setEditingBudget(null);
    } catch (err) {
      console.error('Error updating budget:', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteBudget = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await deleteBudget(id);
      } catch (err) {
        console.error('Error deleting budget:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
  };

  const loading = budgetsLoading || expensesLoading;
  const error = budgetsError || expensesError;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 main-content-area">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">my budget</h1>
            <Button onClick={() => setIsModalOpen(true)} className="bg-purple-600 hover:bg-purple-700">
              ➕ Create a new budget
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            {loading ? <LoadingSpinner className="py-8" /> : (
              <BudgetList
                budgets={budgets}
                currentExpenses={currentExpensesByCategory}
                error={error}
                onEdit={handleEditBudget}
                onDelete={handleDeleteBudget}
              />
            )}
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={editingBudget ? 'Edit budget' : 'Create a new budget'}
          >
            <BudgetForm
              initialData={editingBudget || {}}
              isEditing={!!editingBudget}
              onSubmit={editingBudget ? handleUpdateBudget : handleAddBudget}
              onClose={handleCloseModal}
              loading={formSubmitting}
            />
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default BudgetPage;