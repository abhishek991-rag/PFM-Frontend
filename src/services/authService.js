import api from "./api";

const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    console.log("authService: Register API response:", response.data);

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);
      console.log(
        "authService: User and token saved to local storage after registration."
      );
    }
    return response.data;
  } catch (error) {
    console.error(
      "authService: Error during registration:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    console.log("authService: Login API response:", response.data);

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);
      console.log(
        "authService: User and token saved to local storage after login."
      );
    } else {
      console.warn(
        "authService: Login successful, but no token found in response.data."
      );
    }
    return response.data;
  } catch (error) {
    console.error(
      "authService: Error during login:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  console.log("authService: User and token removed from local storage.");
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  const tokenStr = localStorage.getItem("token");
  console.log(
    "authService: Checking current user from local storage. UserStr:",
    userStr,
    "TokenStr:",
    tokenStr
  );
  if (userStr && tokenStr) {
    try {
      const user = JSON.parse(userStr);
      return user;
    } catch (e) {
      console.error("authService: Error parsing user from local storage:", e);
      logout();
      return null;
    }
  }
  return null;
};

const updateProfile = async (userData) => {
  try {
    const response = await api.put("/users/profile", userData);
    console.log("authService: Update Profile API response:", response.data);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("authService: User profile updated in local storage.");
    }
    return response.data;
  } catch (error) {
    console.error(
      "authService: Error updating profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
};

export default authService;
