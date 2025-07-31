import axiosInstance from "./axiosInstance";

export const getGamesHistory = async (page, limit) => {
    const response = await axiosInstance.get(`/games?limit=${limit}&page=${page}`);
    return response.data;
  };
export const postNewGames = async (gameData) => {
    const response = await axiosInstance.post("/games", gameData);
    return response.data;
  };


// PATCH para actualizar la partida
export const patchGame = async (gameId, data) => {
    try {
        const response = await axiosInstance.patch("/games/join", data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la partida:", error);
        throw error;
    }
};

