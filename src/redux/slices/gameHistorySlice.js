import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGamesHistory } from "../../api/gamesApi"; // Ajusta la ruta según tu estructura

// Acción asincrónica para obtener el historial de partidas
export const fetchGameHistory = createAsyncThunk(
  "gameHistory/fetchGameHistory",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const data = await getGamesHistory(page, limit);
      console.log('data', data); // 👀 Deberías ver { total, page, totalPages, data: [...] }
      return data; // ✅ Retorna el arreglo de partidas directamente
    } catch (error) {
      console.error("Error al obtener historial:", error);
      return rejectWithValue(
        error.response?.data?.message || "Error desconocido"
      );
    }
  }
);

// Slice de Redux para manejar el historial de partidas
const gameHistorySlice = createSlice({
  name: "gameHistory",
  initialState: {
    data: [],
    page: 0,
    total: 0,
    totalPages: 0,
    loading: false,
    error: null,
    currentPage: 0,
    gamesPerPage: 5, // Número de partidas por página
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // ✅ Aquí llegan los datos correctos
        state.page = action.payload.page;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchGameHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = gameHistorySlice.actions;
export default gameHistorySlice.reducer;
