import api from "./api";

export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);

// Profile management
export const getUserProfile = () => api.get("/user/profile");
export const updateUserProfile = (profileData) =>
  api.put("/user/profile", profileData);

// Password management
export const changePassword = (passwordData) =>
  api.put("/user/change-password", passwordData);
