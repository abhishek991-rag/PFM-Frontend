import React, { useState, useEffect } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

const LoginForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
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
    console.log("Input changed:", e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    console.log("handleSubmit triggered in LoginForm");

    if (!formData.email || !formData.password) {
      setFormError("Please fill in all required fields.");
      console.log("Validation failed: Missing fields");
      return;
    }

    console.log("Submitting login form data:", formData);
    onSubmit(formData.email, formData.password);
    console.log("onSubmit called in LoginForm");
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
        placeholder="your password"
      />
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
