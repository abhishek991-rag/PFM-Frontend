import { useState, useEffect, useCallback } from 'react';
import budgetService from '../services/budgetService';

const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBudgets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await budgetService.getBudgets();
      setBudgets(data);
    } catch (err) {
      setError('Failed to load budgets.');
      console.error('Failed to fetch budgets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const addBudget = async (budgetData) => {
    try {
      const newBudget = await budgetService.addBudget(budgetData);
      setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
      return newBudget;
    } catch (err) {
      setError('Failed to add budget.');
      console.error('Failed to add budget:', err);
      throw err;
    }
  };

  const updateBudget = async (id, budgetData) => {
    try {
      const updatedBudget = await budgetService.updateBudget(id, budgetData);
      setBudgets((prevBudgets) =>
        prevBudgets.map((budget) => (budget._id === id ? updatedBudget : budget))
      );
      return updatedBudget;
    } catch (err) {
      setError('Failed to update budget.');
      console.error('Failed to update budget:', err);
      throw err;
    }
  };

  const deleteBudget = async (id) => {
    try {
      await budgetService.deleteBudget(id);
      setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget._id !== id));
    } catch (err) {
      setError('Failed to delete budget.');
      console.error('Failed to delete budget:', err);
      throw err;
    }
  };

  return { budgets, loading, error, addBudget, updateBudget, deleteBudget, fetchBudgets };
};

export default useBudgets;