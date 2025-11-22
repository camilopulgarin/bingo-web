import axiosInstance from "../api/axiosInstance";

/**
 * Verifica si el usuario autenticado es el creador de la partida
 * @param {string} gameId
 * @returns {Promise<boolean>}
 */
export const isGameCreator = async (gameId) => {
  const res = await axiosInstance.get(`/games/${gameId}/is-creator`);
  return res.data.isCreator;
};
