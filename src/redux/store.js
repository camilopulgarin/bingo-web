// src/redux/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import gameHistoryReducer from "./slices/gameHistorySlice"; 
// import usersReducer from "./slices/usersNewRoomSlice"; 
// import gameReducer from "./slices/postNewRoomSlice";



// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     gameHistory: gameHistoryReducer,
//     users: usersReducer,
//     games: gameReducer,
    
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import gameHistoryReducer from "./slices/gameHistorySlice"; 
import usersReducer from "./slices/usersNewRoomSlice"; 

import gameReducer from "./slices/postNewRoomSlice";
import userReducer from "./slices/userInfoSlice";
import randomBingoReducer from "./slices/bingoSlice";
import bingoTotalCellReducer from "./slices/game/BingoTotalCellSlice"; // Asegúrate de que este es el nombre correcto del reducer



export const store = configureStore({
  reducer: {
    auth: authReducer,
    gameHistory: gameHistoryReducer,
    users: usersReducer,
    games: gameReducer,
    user: userReducer,
    randomBingo: randomBingoReducer,
    BingoTotalCell: bingoTotalCellReducer, // Asumiendo que este es el reducer para BingoTotalCell

  },
});

export default store;

