// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import gameHistoryReducer from "./slices/gameHistorySlice"; 


export const store = configureStore({
  reducer: {
    auth: authReducer,
    gameHistory: gameHistoryReducer,
  },
});

export default store;
