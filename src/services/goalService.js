import api from "./api";

const getGoals = async () => {
  try {
    const response = await api.get("/goals");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching goals:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const addGoal = async (goalData) => {
  try {
    const response = await api.post("/goals", goalData);
    return response.data;
  } catch (error) {
    console.error("Error adding goal:", error.response?.data || error.message);
    throw error;
  }
};

const updateGoal = async (id, goalData) => {
  try {
    const response = await api.put(`/goals/${id}`, goalData);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating goal with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteGoal = async (id) => {
  try {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting goal with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const goalService = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};

export default goalService;
