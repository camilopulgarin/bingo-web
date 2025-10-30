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
import bingoTotalCellReducer from "./slices/game/BingoTotalCellSlice";
import joinGameReducer from "./slices/game/joinGame";
import selectedBingoReducer from "./slices/game/selectedBingoSlice";
import gameDetailReducer from "./slices/game/getDetailSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gameHistory: gameHistoryReducer,
    users: usersReducer,
    games: gameReducer,
    user: userReducer,
    randomBingo: randomBingoReducer,
    BingoTotalCell: bingoTotalCellReducer,
    joinGame: joinGameReducer,
    selectedBingo: selectedBingoReducer,
    gameDetail: gameDetailReducer,
  },
});

export default store;
