import axiosInstance from "./axiosInstance";


export const getUsers = async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
  };

export const getUserInfo = async () => {
    const response = await axiosInstance.get("/users/info");
    return response.data;
  };

export const updateUser = async (userData) => {
    const response = await axiosInstance.put("/users", userData);
    return response.data;
  };

