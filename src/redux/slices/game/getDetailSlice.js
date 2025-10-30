import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGameDetail } from "../../../api/gamesApi";

// Acción asíncrona (Thunk)
export const fetchGameDetail = createAsyncThunk(
  "gameDetail/fetchGameDetail",
  async (gameId, { rejectWithValue }) => {
    try {
      const data = await getGameDetail(gameId);
      return data;
    } catch (error) {
      console.error("Error al obtener detalle de la partida:", error);
      return rejectWithValue(
        error.response?.data || "Error al cargar el detalle"
      );
    }
  }
);

const gameDetailSlice = createSlice({
  name: "gameDetail",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearGameDetail: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGameDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearGameDetail } = gameDetailSlice.actions;

export default gameDetailSlice.reducer;
