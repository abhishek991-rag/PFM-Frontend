import React, { useState, useEffect } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import SelectField from "../common/SelectField";

const BudgetForm = ({
  initialData = {},
  onSubmit,
  isEditing = false,
  onClose,
  loading = false,
}) => {
  const [formData, setFormData] = useState(() => {
    const { startDate, endDate, ...restOfInitialData } = initialData;

    const formattedStartDate = startDate
      ? new Date(startDate).toISOString().split("T")[0]
      : "";
    const formattedEndDate = endDate
      ? new Date(endDate).toISOString().split("T")[0]
      : "";

    return {
      ...restOfInitialData,
      category: initialData.category || "",
      amount: initialData.amount || "",
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
  });

  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const { startDate, endDate, ...restOfInitialData } = initialData;
    const formattedStartDate = startDate
      ? new Date(startDate).toISOString().split("T")[0]
      : "";
    const formattedEndDate = endDate
      ? new Date(endDate).toISOString().split("T")[0]
      : "";

    setFormData({
      ...restOfInitialData,
      category: initialData.category || "",
      amount: initialData.amount || "",
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    setFormError(null);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError(null);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    const { category, amount, startDate, endDate } = formData;

    // Client-side validation checks
    if (!category || !amount || !startDate || !endDate) {
      setFormError("Please fill in all required fields.");
      return;
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setFormError("Amount must be a valid positive number.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setFormError("End date must be after the start date.");
      return;
    }

    // Prepare data to be sent to the parent component/API
    const dataToSend = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    onSubmit(dataToSend);
  };

  // Predefined categories for the SelectField
  const categories = [
    { value: "", label: "Select Category", disabled: true }, // Default disabled option
    { value: "Food", label: "Food" },
    { value: "Housing", label: "Housing" },
    { value: "Transportation", label: "Transportation" },
    { value: "Utilities", label: "Utilities" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Shopping", label: "Shopping" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Education", label: "Education" },
    { value: "Personal Care", label: "Personal Care" },
    { value: "Debt", label: "Debt" },
    { value: "Other", label: "Other" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{formError}</span>
        </div>
      )}

      {/* Category Selection Field */}
      <SelectField
        label="Category"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        options={categories}
        required
      />

      {/* Budget Amount Input Field */}
      <InputField
        label="Budget Amount"
        id="amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
        min="0.01" // Minimum value for amount
        step="0.01" // Allows decimal values
        placeholder="e.g.: 5000"
      />
      {/* Start Date Input Field */}
      <InputField
        label="Start Date"
        id="startDate"
        name="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      {/* End Date Input Field */}
      <InputField
        label="End Date"
        id="endDate"
        name="endDate"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        required
      />

      {/* Form action buttons */}
      <div className="flex justify-end space-x-3 mt-6">
        {/* Cancel Button (only shown if onClose prop is provided) */}
        {onClose && (
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
            disabled={loading} // Disable if form is submitting
          >
            Cancel
          </Button>
        )}
        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white"
          disabled={loading} // Disable if form is submitting
        >
          {loading
            ? "Processing..."
            : isEditing
            ? "Update Budget"
            : "Create Budget"}
        </Button>
      </div>
    </form>
  );
};

export default BudgetForm;
