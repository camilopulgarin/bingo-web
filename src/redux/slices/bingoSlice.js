// store/bingoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const generateBingoCard = () => {
  const getColumn = (start, end, count = 5) => {
    const nums = Array.from({ length: end - start + 1 }, (_, i) => i + start);
    return nums.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const card = {
    B: getColumn(1, 15),
    I: getColumn(16, 30),
    N: getColumn(31, 45),
    G: getColumn(46, 60),
    O: getColumn(61, 75),
  };

  // Insertar espacio libre
  card.N[2] = '★';
  return card;
};

const randomBingoSlice = createSlice({
  name: 'bingo',
  initialState: {
    card: generateBingoCard(),
  },
  reducers: {
    generateCard: (state) => {
      state.card = generateBingoCard();
    },
  },
});

export const { generateCard } = randomBingoSlice.actions;
export default randomBingoSlice.reducer;
