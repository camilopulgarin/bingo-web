/* import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGamesHistory } from "../../api/gamesApi"; // Ajusta la ruta según tu estructura

// Acción asincrónica para obtener el historial de partidas
export const fetchGameHistory = createAsyncThunk(
    "gameHistory/fetchGameHistory",
    async (_, { rejectWithValue }) => {
      try {
        const data = await getGamesHistory();
        console.log('data', data)
        return data.games;
      } catch (error) {
        console.error("Error al obtener historial:", error); // 🔴 Muestra detalles en consola
        return rejectWithValue(
          error.response?.data?.message || "Error desconocido"
        );}
  }
);

// Slice de Redux para manejar el historial de partidas
const gameHistorySlice = createSlice({
  name: "gameHistory",
  initialState: {
    games: [],
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
        state.games = action.payload;
      })
      .addCase(fetchGameHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = gameHistorySlice.actions;
export default gameHistorySlice.reducer; */

/* import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGamesHistory } from "../../api/gamesApi";

// Acción asincrónica para obtener el historial de partidas
export const fetchGameHistory = createAsyncThunk(
  "gameHistory/fetchGameHistory",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getGamesHistory();
      console.log("data.games", data.games); // Verifica que sea un array
      return data?.games ?? []; // ✅ Evita que se retorne undefined
    } catch (error) {
      console.error("Error al obtener historial:", error);
      return rejectWithValue(
        error.response?.data?.message || "Error desconocido"
      );
    }
  }
);

const gameHistorySlice = createSlice({
  name: "gameHistory",
  initialState: {
    games: [], // ✅ Siempre debe ser un array
    loading: false,
    error: null,
    currentPage: 0,
    gamesPerPage: 5,
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
        state.games = action.payload;
      })
      .addCase(fetchGameHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = gameHistorySlice.actions;
export default gameHistorySlice.reducer;
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGamesHistory } from "../../api/gamesApi"; // Ajusta la ruta según tu estructura

// Acción asincrónica para obtener el historial de partidas
export const fetchGameHistory = createAsyncThunk(
  "gameHistory/fetchGameHistory",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getGamesHistory();
      console.log('data', data); // 👀 Deberías ver { total, page, totalPages, data: [...] }
      return data.data; // ✅ Retorna el arreglo de partidas directamente
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
    games: [],
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
        state.games = action.payload; // ✅ Aquí llegan los datos correctos
      })
      .addCase(fetchGameHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = gameHistorySlice.actions;
export default gameHistorySlice.reducer;
