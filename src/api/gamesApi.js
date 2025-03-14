import axiosInstance from "./axiosInstance";

export const getGamesHistory = async () => {
    const response = await axiosInstance.get("/games");
    return response.data;
  };
