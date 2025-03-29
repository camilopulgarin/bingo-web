import axiosInstance from "./axiosInstance";


export const getUsers = async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
  };