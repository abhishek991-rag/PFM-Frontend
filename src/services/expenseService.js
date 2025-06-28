import api from "./api";

const getExpenses = async () => {
  try {
    const response = await api.get("/expenses");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching expenses:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const addExpense = async (expenseData) => {
  try {
    const response = await api.post("/expenses", expenseData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding expense:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const updateExpense = async (id, expenseData) => {
  try {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating expense with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting expense with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const expenseService = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};

export default expenseService;
