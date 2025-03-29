
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postNewGames } from "../../api/gamesApi";

// Thunk para crear un nuevo juego con datos
export const createNewGame = createAsyncThunk(
  "games/createNewGame",
  async (gameData, { rejectWithValue }) => {
    try {
      const data = await postNewGames(gameData); // Enviar los datos al backend
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al crear el juego");
    }
  }
);

const gameSlice = createSlice({
  name: "games",
  initialState: {
    game: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewGame.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
      })
      .addCase(createNewGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gameSlice.reducer;
