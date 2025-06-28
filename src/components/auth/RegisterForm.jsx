import React, { useState, useEffect } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

const RegisterForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    setFormError(error);
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name || !formData.email || !formData.password) {
      setFormError("Please fill in all required fields.");
      return;
    }
    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    console.log("Submitting registration form data:", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(formError || error) && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{formError || error}</span>
        </div>
      )}
      <InputField
        label="Name"
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="your full name"
      />
      <InputField
        label="email"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Your email address"
      />
      <InputField
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="A strong password (minimum 6 characters)"
      />
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? "Registration in progress..." : "Register now"}
      </Button>
    </form>
  );
};

export default RegisterForm;
