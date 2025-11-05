import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: {
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
  },
};

const selectedBingoSlice = createSlice({
  name: "selectedBingo",
  initialState,
  reducers: {
    toggleCell: (state, action) => {
      const { column, value } = action.payload;

      // 🔒 Seguridad: si la columna no existe, inicializarla
      if (!state.selected[column]) {
        state.selected[column] = [];
      }

      const exists = state.selected[column].includes(value);

      if (exists) {
        // Quitar el valor si ya estaba seleccionado
        state.selected[column] = state.selected[column].filter(
          (v) => v !== value
        );
      } else {
        // Agregar el valor si no estaba seleccionado
        state.selected[column].push(value);
      }
    },
    resetSelected: (state) => {
      state.selected = {
        B: [],
        I: [],
        N: [],
        G: [],
        O: [],
      };
    },
  },
});

export const { toggleCell, resetSelected } = selectedBingoSlice.actions;
export default selectedBingoSlice.reducer;
