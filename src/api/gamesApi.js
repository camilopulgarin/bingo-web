import axiosInstance from "./axiosInstance";

export const getGamesHistory = async () => {
    const response = await axiosInstance.get("/games");
    return response.data;
  };
export const postNewGames = async (gameData) => {
    const response = await axiosInstance.post("/games", gameData);
    return response.data;
  };
