import React, { useState, useEffect } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

const GoalForm = ({
  initialData = {},
  onSubmit,
  isEditing = false,
  onClose,
  loading = false,
}) => {
  const [formData, setFormData] = useState(() => {
    const { targetDate, ...restOfInitialData } = initialData;
    const formattedTargetDate = targetDate
      ? new Date(targetDate).toISOString().split("T")[0]
      : "";

    return {
      ...restOfInitialData,
      name: initialData.name || "",
      targetAmount: initialData.targetAmount || "",
      savedAmount: initialData.savedAmount || 0,
      targetDate: formattedTargetDate,
      description: initialData.description || "",
    };
  });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const { targetDate, ...restOfInitialData } = initialData;
    const formattedTargetDate = targetDate
      ? new Date(targetDate).toISOString().split("T")[0]
      : "";

    setFormData({
      ...restOfInitialData,
      name: initialData.name || "",
      targetAmount: initialData.targetAmount || "",
      savedAmount: initialData.savedAmount || 0,
      targetDate: formattedTargetDate,
      description: initialData.description || "",
    });
    setFormError(null);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    const { name, targetAmount, savedAmount, targetDate } = formData;
    if (!name || !targetAmount || !targetDate) {
      setFormError(
        "Please fill in all required fields (name, target amount, target date)."
      );
      return;
    }
    if (isNaN(parseFloat(targetAmount)) || parseFloat(targetAmount) <= 0) {
      setFormError(
        "Please fill in all required fields (name, target amount, target date)."
      );
      return;
    }
    if (isNaN(parseFloat(savedAmount)) || parseFloat(savedAmount) < 0) {
      setFormError("The amount saved must be a valid non-negative number.");
      return;
    }
    if (new Date(targetDate) < new Date()) {
      setFormError("The target date must be in the future.");
      return;
    }
    if (parseFloat(savedAmount) > parseFloat(targetAmount)) {
      setFormError("The amount saved cannot exceed the target amount.");
      return;
    }

    const dataToSend = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      savedAmount: parseFloat(formData.savedAmount),
    };

    onSubmit(dataToSend);
  };

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

      <InputField
        label="Target name"
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Examples: Down payment for a house, car, vacation"
      />
      <InputField
        label="Target Amount (₹)"
        id="targetAmount"
        name="targetAmount"
        type="number"
        value={formData.targetAmount}
        onChange={handleChange}
        required
        min="0.01"
        step="0.01"
        placeholder="Example: 500000"
      />
      <InputField
        label="Amount saved so far (₹)"
        id="savedAmount"
        name="savedAmount"
        type="number"
        value={formData.savedAmount}
        onChange={handleChange}
        min="0"
        step="0.01"
        placeholder="Example: 50000"
      />
      <InputField
        label="target date"
        id="targetDate"
        name="targetDate"
        type="date"
        value={formData.targetDate}
        onChange={handleChange}
        required
      />
      <InputField
        label="Description (optional)"
        id="description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        placeholder="Why is this goal important?"
        rows="3"
      />

      <div className="flex justify-end space-x-3 mt-6">
        {onClose && (
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading}
        >
          {loading
            ? "Process is going on..."
            : isEditing
            ? "Update target"
            : "Set goals"}
        </Button>
      </div>
    </form>
  );
};

export default GoalForm;
