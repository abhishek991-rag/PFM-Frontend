import React, { createContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial check: Load user from browser's local storage on component mount
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const currentUser = authService.getCurrentUser();
      console.log(
        "AuthContext: Initial check - currentUser from localStorage:",
        currentUser
      ); // NEW LOG: Check what's retrieved from local storage
      if (currentUser) {
        setUser(currentUser); // If user found, set it in state
        console.log("AuthContext: User set from localStorage:", currentUser);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);
      console.log("AuthContext: Login API returned data:", data);

      if (data && data.token && data._id) {
        setUser(data);
        console.log("AuthContext: User state SET to (after login):", data);
      } else {
        console.warn(
          "AuthContext: Login successful, but data from authService is missing expected properties (token, _id). Data:",
          data
        ); // Warning if expected data is not found
        setError("Login successful, but failed to retrieve user data.");
      }
      setLoading(false);
      return data;
    } catch (err) {
      console.error(
        "AuthContext: Error during login:",
        err.response?.data?.message || err.message || err
      ); // More detailed error log
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
      setLoading(false);
      throw err;
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(userData);
      console.log("AuthContext: Register API returned data:", data);
      if (data && data.token && data._id) {
        setUser(data);
        console.log(
          "AuthContext: User state SET to (after registration):",
          data
        );
      } else {
        console.warn(
          "AuthContext: Registration successful, but data from authService is missing expected properties (token, _id). Data:",
          data
        );
        setError("Registration successful, but failed to retrieve user data.");
      }
      setLoading(false);
      return data;
    } catch (err) {
      console.error(
        "AuthContext: Error during registration:",
        err.response?.data?.message || err.message || err
      );
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setLoading(false);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
    console.log("AuthContext: User logged out. User state set to null.");
  }, []);

  const updateProfile = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.updateProfile(userData);
      console.log("AuthContext: Update Profile API returned data:", data);
      if (data && data._id) {
        setUser(data);
        console.log(
          "AuthContext: User state SET after profile update to:",
          data
        );
      } else {
        console.warn(
          "AuthContext: Profile update successful, but data from authService is missing expected user properties. Data:",
          data
        );
        setError(
          "Profile update successful, but failed to retrieve updated user data."
        );
      }
      setLoading(false);
      return data;
    } catch (err) {
      console.error(
        "AuthContext: Error updating profile:",
        err.response?.data?.message || err.message || err
      );
      setError(err.response?.data?.message || "Failed to update profile.");
      setLoading(false);
      throw err;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        setError,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
