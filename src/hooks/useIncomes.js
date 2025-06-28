import { useState, useEffect, useCallback } from 'react';
import incomeService from '../services/incomeService';

const useIncomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIncomes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await incomeService.getIncomes();
      setIncomes(data);
    } catch (err) {
      setError('Failed to load incomes.');
      console.error('Failed to fetch incomes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  const addIncome = async (incomeData) => {
    try {
      const newIncome = await incomeService.addIncome(incomeData);
      setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
      return newIncome;
    } catch (err) {
      setError('Failed to add income.');
      console.error('Failed to add income:', err);
      throw err;
    }
  };

  const updateIncome = async (id, incomeData) => {
    try {
      const updatedIncome = await incomeService.updateIncome(id, incomeData);
      setIncomes((prevIncomes) =>
        prevIncomes.map((inc) => (inc._id === id ? updatedIncome : inc))
      );
      return updatedIncome;
    } catch (err) {
      setError('Failed to update income.');
      console.error('Failed to update income:', err);
      throw err;
    }
  };

  const deleteIncome = async (id) => {
    try {
      await incomeService.deleteIncome(id);
      setIncomes((prevIncomes) => prevIncomes.filter((inc) => inc._id !== id));
    } catch (err) {
      setError('Failed to delete income.');
      console.error('Failed to delete income:', err);
      throw err;
    }
  };

  return { incomes, loading, error, addIncome, updateIncome, deleteIncome, fetchIncomes };
};

export default useIncomes;