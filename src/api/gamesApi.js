import axiosInstance from "./axiosInstance";

// Obtener info de jugador en una partida
export const getPlayerInfo = async (gameId) => {
  try {
    const response = await axiosInstance.get(`/games/${gameId}/player-info`);
    return response.data; // { gameId, gameMode, selectedTables, tableCount }
  } catch (error) {
    console.error("Error al obtener info del jugador:", error);
    throw error;
  }
};

// Historial de partidas
export const getGamesHistory = async (page, limit) => {
  const response = await axiosInstance.get(
    `/games?limit=${limit}&page=${page}`
  );
  return response.data;
};

// Crear nueva partida
export const postNewGames = async (gameData) => {
  const response = await axiosInstance.post("/games", gameData);
  return response.data;
};

// Unirse o actualizar partida
export const patchGame = async (gameId, data) => {
  try {
    const response = await axiosInstance.patch("/games/join", data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la partida:", error);
    throw error;
  }
};

// Obtener detalles de una partida
export const getGameDetail = async (gameId) => {
  try {
    const response = await axiosInstance.get(`/games/${gameId}/detail`);
    return response.data; // Detalles de la partida
  } catch (error) {
    console.error("Error al obtener detalles de la partida:", error);
    throw error;
  }
};
