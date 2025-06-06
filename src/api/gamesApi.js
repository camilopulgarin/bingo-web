import axiosInstance from "./axiosInstance";

export const getGamesHistory = async (page, limit) => {
    const response = await axiosInstance.get(`/games?limit=${limit}&page=${page}`);
    return response.data;
  };
export const postNewGames = async (gameData) => {
    const response = await axiosInstance.post("/games", gameData);
    return response.data;
  };
