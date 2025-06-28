import api from "./api";

const getBudgets = async () => {
  try {
    const response = await api.get("/budgets");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching budgets:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const addBudget = async (budgetData) => {
  try {
    const response = await api.post("/budgets", budgetData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding budget:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const updateBudget = async (id, budgetData) => {
  try {
    const response = await api.put(`/budgets/${id}`, budgetData);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating budget with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteBudget = async (id) => {
  try {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting budget with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const budgetService = {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
};

export default budgetService;
