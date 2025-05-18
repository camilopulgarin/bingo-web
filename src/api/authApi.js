// src/api/authApi.js
import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post("/users", {
    name: userData.user,
    email: userData.email,
    password: userData.password,
  });
  return response.data;
};

export const changePassword = async ({ oldPassword, newPassword }) => {
  const response = await axiosInstance.put("/auth/change-password", {
    currentPassword: oldPassword,
    newPassword,
  });
  return response.data;
};