import { useState, useEffect, useCallback } from "react";
import goalService from "../services/goalService";

const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await goalService.getGoals();
      setGoals(data);
    } catch (err) {
      setError("Failed to load goals.");
      console.error("Failed to fetch goals:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const addGoal = async (goalData) => {
    try {
      const newGoal = await goalService.addGoal(goalData);
      setGoals((prevGoals) => [...prevGoals, newGoal]);
      return newGoal;
    } catch (err) {
      setError("Failed to add goal.");
      console.error("Failed to add goal:", err);
      throw err;
    }
  };

  const updateGoal = async (id, goalData) => {
    try {
      const updatedGoal = await goalService.updateGoal(id, goalData);
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal._id === id ? updatedGoal : goal))
      );
      return updatedGoal;
    } catch (err) {
      setError("Failed to update goal.");
      console.error("Failed to update goal:", err);
      throw err;
    }
  };

  const deleteGoal = async (id) => {
    try {
      await goalService.deleteGoal(id);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== id));
    } catch (err) {
      setError("Failed to delete goal.");
      console.error("Failed to delete goal:", err);
      throw err;
    }
  };

  return { goals, loading, error, addGoal, updateGoal, deleteGoal, fetchGoals };
};

export default useGoals;
