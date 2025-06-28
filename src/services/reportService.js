import api from "./api";

const getExpenseSummaryByCategory = async (startDate, endDate) => {
  try {
    const response = await api.get(`/reports/expenses-by-category`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching expense summary by category:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const reportService = {
  getExpenseSummaryByCategory,
};

export default reportService;
