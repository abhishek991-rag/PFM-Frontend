import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import SelectField from '../common/SelectField';

const IncomeForm = ({ initialData = {}, onSubmit, isEditing = false, onClose, loading = false }) => {
  const [formData, setFormData] = useState(() => {
    const { date, ...restOfInitialData } = initialData;
    const formattedDate = date
      ? new Date(date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    return {
      ...restOfInitialData,
      date: formattedDate,
      description: initialData.description || '',
      amount: initialData.amount || '',
      source: initialData.source || '',
    };
  });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const { date, ...restOfInitialData } = initialData;
    const formattedDate = date
      ? new Date(date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    setFormData({
      ...restOfInitialData,
      date: formattedDate,
      description: initialData.description || '',
      amount: initialData.amount || '',
      source: initialData.source || '',
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

    if (!formData.description || !formData.amount || !formData.date || !formData.source) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setFormError('The amount must be a positive number.');
      return;
    }

    const dataToSend = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    onSubmit(dataToSend);
  };

  const sources = [
    { value: '', label: 'Select source', disabled: true },
    { value: 'Salary', label: 'Salary' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Investments', label: 'Investment'},
    { value: 'Gift', label: 'Gift'},
    { value: 'Rental', label: 'Rent' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{formError}</span>
        </div>
      )}

      <InputField
        label="Description"
        id="description"
        name="description"
        type="text"
        value={formData.description}
        onChange={handleChange}
        required
        placeholder="Brief statement of income"
      />

      <InputField
        label="Amount"
        id="amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
        placeholder="Amount (eg. 10000)"
      />

      <InputField
        label="date"
        id="date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <SelectField
        label="Source"
        id="source"
        name="source"
        value={formData.source}
        onChange={handleChange}
        options={sources}
        required
      />

      <div className="flex justify-end space-x-3">
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
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={loading}
        >
          {loading ? 'Process is going on...' : (isEditing ? 'Update income' : 'Add income')}
        </Button>
      </div>
    </form>
  );
};

export default IncomeForm;