import api from "./api";

const getIncomes = async () => {
  try {
    const response = await api.get("/incomes");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching incomes:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const addIncome = async (incomeData) => {
  try {
    const response = await api.post("/incomes", incomeData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding income:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const updateIncome = async (id, incomeData) => {
  try {
    const response = await api.put(`/incomes/${id}`, incomeData);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating income with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteIncome = async (id) => {
  try {
    const response = await api.delete(`/incomes/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting income with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

const incomeService = {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
};

export default incomeService;
