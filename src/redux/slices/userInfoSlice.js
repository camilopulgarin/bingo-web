// // src/redux/slices/userSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getUserInfo } from "../../api/users"; // función que ya hace axios.get("/users/info")

// // Thunk para obtener la información del usuario
// export const userInfo = createAsyncThunk(
//   "user/getUserInfo",
//   async (_, thunkAPI) => {
//     try {
//       const response = await getUserInfo(); // ✅ usar directamente la función
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || "Error al obtener usuario");
//     }
//   }
// );

// // Slice
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     data: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(userInfo.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(userInfo.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(userInfo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default userSlice.reducer;

// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo, updateUser } from "../../api/users";

// Thunk para obtener la información del usuario
export const userInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, thunkAPI) => {
    try {
      const response = await getUserInfo();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error al obtener usuario");
    }
  }
);

// 🔄 Thunk para actualizar el usuario
export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => {
    try {
      const response = await updateUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error al actualizar usuario");
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
    updateStatus: "idle", // idle | loading | succeeded | failed
    updateError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener información del usuario
      .addCase(userInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Actualizar usuario
      .addCase(updateUserThunk.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.data = action.payload; // asumimos que devuelve los datos actualizados
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });
  },
});

export default userSlice.reducer;

