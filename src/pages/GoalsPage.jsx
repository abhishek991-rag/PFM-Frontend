import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import GoalForm from '../components/goals/GoalForm';
import GoalList from '../components/goals/GoalList';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import useGoals from '../hooks/useGoals';
import LoadingSpinner from '../components/common/LoadingSpinner';

const GoalPage = () => {
  const { goals, loading, error, addGoal, updateGoal, deleteGoal } = useGoals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleAddGoal = async (newGoalData) => {
    setFormSubmitting(true);
    try {
      await addGoal(newGoalData);
      setIsModalOpen(false);
      setEditingGoal(null);
    } catch (err) {
      console.error('Error adding target:', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleUpdateGoal = async (updatedGoalData) => {
    setFormSubmitting(true);
    try {
      await updateGoal(editingGoal._id, updatedGoalData);
      setIsModalOpen(false);
      setEditingGoal(null);
    } catch (err) {
      console.error('Error updating target:', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteGoal = async (id) => {
    if (window.confirm('Are you sure you want to delete this target?')) {
      try {
        await deleteGoal(id);
      } catch (err) {
        console.error('Error deleting target:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 main-content-area">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Goals</h1>
            <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              ➕ Create a new goal
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            {loading ? <LoadingSpinner className="py-8" /> : (
              <GoalList
                goals={goals}
                error={error}
                onEdit={handleEditGoal}
                onDelete={handleDeleteGoal}
              />
            )}
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={editingGoal ? 'Edit target' : 'Create a new target'}
          >
            <GoalForm
              initialData={editingGoal || {}}
              isEditing={!!editingGoal}
              onSubmit={editingGoal ? handleUpdateGoal : handleAddGoal}
              onClose={handleCloseModal}
              loading={formSubmitting}
            />
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default GoalPage;