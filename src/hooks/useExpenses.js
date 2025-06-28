import { useState, useEffect, useCallback } from 'react';
import expenseService from '../services/expenseService';

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await expenseService.getExpenses();
      setExpenses(data);
    } catch (err) {
      setError('Failed to load expenses.');
      console.error('Failed to fetch expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = async (expenseData) => {
    try {
      const newExpense = await expenseService.addExpense(expenseData);
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      return newExpense;
    } catch (err) {
      setError('Failed to add expense.');
      console.error('Failed to add expense:', err);
      throw err;
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const updatedExpense = await expenseService.updateExpense(id, expenseData);
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) => (exp._id === id ? updatedExpense : exp))
      );
      return updatedExpense;
    } catch (err) {
      setError('Failed to update expense.');
      console.error('Failed to update expense:', err);
      throw err;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await expenseService.deleteExpense(id);
      setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp._id !== id));
    } catch (err) {
      setError('Failed to delete expense.');
      console.error('Failed to delete expense:', err);
      throw err;
    }
  };

  return { expenses, loading, error, addExpense, updateExpense, deleteExpense, fetchExpenses };
};

export default useExpenses;