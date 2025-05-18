import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../api/users";

export const fetchUsers = createAsyncThunk(
  "getUsers/fetchGetUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUsers();
      return data.users;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error desconocido al obtener los usuarios"
      );
    }
  }
);


const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;