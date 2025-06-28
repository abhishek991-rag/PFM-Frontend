import React, { useState, useEffect } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import SelectField from "../common/SelectField";

const ExpenseForm = ({
  initialData = {},
  onSubmit,
  isEditing = false,
  onClose,
  loading = false,
}) => {
  // Initialize form data state.
  // It handles initial values, formatting dates, and setting defaults.
  const [formData, setFormData] = useState(() => {
    const { date, ...restOfInitialData } = initialData;
    // Format date to YYYY-MM-DD for input type="date"
    const formattedDate = date
      ? new Date(date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    return {
      ...restOfInitialData,
      date: formattedDate,
      description: initialData.description || "",
      amount: initialData.amount || "",
      category: initialData.category || "",
    };
  });

  // State for form-specific error messages
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const { date, ...restOfInitialData } = initialData;
    const formattedDate = date
      ? new Date(date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    setFormData({
      ...restOfInitialData,
      date: formattedDate,
      description: initialData.description || "",
      amount: initialData.amount || "",
      category: initialData.category || "",
    });
    setFormError(null);
  }, [initialData]);

  // Handler for input changes, updates formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError(null);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // Client-side validation checks
    if (
      !formData.description ||
      !formData.amount ||
      !formData.date ||
      !formData.category
    ) {
      setFormError("Please fill in all required fields.");
      return; // Stop submission if validation fails
    }
    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setFormError("Amount must be a positive number.");
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
    { value: "", label: "Select Category", disabled: true },
    { value: "Food", label: "Food" },
    { value: "Transport", label: "Transport" },
    { value: "Utilities", label: "Utilities" },
    { value: "Rent", label: "Rent" },
    { value: "Shopping", label: "Shopping" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Health", label: "Health" },
    { value: "Education", label: "Education" },
    { value: "Others", label: "Others" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Display form error message if present */}
      {formError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{formError}</span>
        </div>
      )}

      {/* Description Input Field */}
      <InputField
        label="Description"
        id="description"
        name="description"
        type="text"
        value={formData.description}
        onChange={handleChange}
        required
        placeholder="Brief description of the expense"
      />

      {/* Amount Input Field */}
      <InputField
        label="Amount"
        id="amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
        placeholder="Amount (e.g., 500)"
      />

      {/* Date Input Field */}
      <InputField
        label="Date"
        id="date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

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

      {/* Form action buttons */}
      <div className="flex justify-end space-x-3">
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
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading} // Disable if form is submitting
        >
          {loading
            ? "Processing..."
            : isEditing
            ? "Update Expense"
            : "Add Expense"}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
