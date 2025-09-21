import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patchGame } from "../../../api/gamesApi";


// Thunk asincrónico para PATCH /games/join
export const joinGame = createAsyncThunk(
  "joinGame/patch",
  async ({ gameId, selectedTables, gameModeVote }, { rejectWithValue }) => {
    try {
      const response = await patchGame(gameId, {
        gameId,
        selectedTables,
        gameModeVote,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const joinGameSlice = createSlice({
  name: "joinGame",
  initialState: {
    loading: false,
    error: null,
    joinedGame: null,
  },
  reducers: {
    resetJoinGame: (state) => {
      state.loading = false;
      state.error = null;
      state.joinedGame = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        state.loading = false;
        state.joinedGame = action.payload;
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetJoinGame } = joinGameSlice.actions;
export default joinGameSlice.reducer;
