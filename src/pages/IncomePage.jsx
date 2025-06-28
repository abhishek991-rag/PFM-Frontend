import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import IncomeForm from '../components/incomes/IncomeForm';
import IncomeList from '../components/incomes/IncomeList';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import useIncomes from '../hooks/useIncomes';
import LoadingSpinner from '../components/common/LoadingSpinner';

const IncomePage = () => {
  const { incomes, loading, error, addIncome, updateIncome, deleteIncome } = useIncomes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleAddIncome = async (newIncomeData) => {
    setFormSubmitting(true);
    try {
      await addIncome(newIncomeData);
      setIsModalOpen(false);
      setEditingIncome(null);
    } catch (err) {
      console.error('Error adding income', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEditIncome = (income) => {
    setEditingIncome(income);
    setIsModalOpen(true);
  };

  const handleUpdateIncome = async (updatedIncomeData) => {
    setFormSubmitting(true);
    try {
      await updateIncome(editingIncome._id, updatedIncomeData);
      setIsModalOpen(false);
      setEditingIncome(null);
    } catch (err) {
      console.error('Error updating income:', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteIncome = async (id) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      try {
        await deleteIncome(id);
      } catch (err) {
        console.error('Error deleting income:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIncome(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 main-content-area">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">my income</h1>
            <Button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700">
              ➕ Add new income
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            {loading ? <LoadingSpinner className="py-8" /> : (
              <IncomeList
                incomes={incomes}
                error={error}
                onEdit={handleEditIncome}
                onDelete={handleDeleteIncome}
              />
            )}
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={editingIncome ? 'Edit Income' : 'Add new income'}
          >
            <IncomeForm
              initialData={editingIncome || {}}
              isEditing={!!editingIncome}
              onSubmit={editingIncome ? handleUpdateIncome : handleAddIncome}
              onClose={handleCloseModal}
              loading={formSubmitting}
            />
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default IncomePage;
