import { createSlice } from '@reduxjs/toolkit';

// Función para generar un conjunto aleatorio de 5 números únicos dentro de un rango
const generateColumn = (min, max, count) => {
  const numbers = new Set();
  while (numbers.size < count) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(rand);
  }
  return Array.from(numbers);
};

// Generador de tarjeta Bingo
const generateBingoCard = () => ({
  B: generateColumn(1, 15, 5),
  I: generateColumn(16, 30, 5),
  N: generateColumn(31, 45, 5).map((n, i) => (i === 2 ? '★' : n)), // Casilla central FREE
  G: generateColumn(46, 60, 5),
  O: generateColumn(61, 75, 5),
});

const initialState = {
  card: generateBingoCard(),
  drawnNumbers: [],
};

const bingoSlice = createSlice({
  name: 'BingoTotalCell',
  initialState,
  reducers: {
    generateCard: (state) => {
      state.card = generateBingoCard();
      state.drawnNumbers = []; // Reinicia los números sorteados al generar nueva tarjeta
    },
    addDrawnNumber: (state, action) => {
      const number = action.payload;
      if (
        number >= 1 &&
        number <= 75 &&
        !state.drawnNumbers.includes(number)
      ) {
        state.drawnNumbers.push(number);
      }
    },
    resetDrawnNumbers: (state) => {
      state.drawnNumbers = [];
    },
  },
});

export const {
  generateCard,
  addDrawnNumber,
  resetDrawnNumbers,
} = bingoSlice.actions;

export default bingoSlice.reducer;
