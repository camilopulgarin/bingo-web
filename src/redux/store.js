// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import gameHistoryReducer from "./slices/gameHistorySlice"; 
import usersReducer from "./slices/usersNewRoomSlice"; 
import gameReducer from "./slices/postNewRoomSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    gameHistory: gameHistoryReducer,
    users: usersReducer,
    games: gameReducer,
  },
});

export default store;
