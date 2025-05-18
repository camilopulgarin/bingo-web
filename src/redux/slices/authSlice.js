import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  register,
  login,
  getUserProfile,
  changePassword as changePasswordAPI,
} from "../../api/authApi";

// Acción para registrar un usuario
export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await register(credentials);
      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
      }
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error inesperado");
    }
  }
);

// Acción para iniciar sesión
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
      }
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error inesperado");
    }
  }
);

// Acción para obtener el perfil del usuario autenticado
export const fetchUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getUserProfile();
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error inesperado");
    }
  }
);

// Acción para cambiar la contraseña del usuario
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const data = await changePasswordAPI(passwordData);
      return data.message || "Contraseña cambiada exitosamente";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al cambiar la contraseña"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jwtToken");
    },
    clearAuthMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Registro de usuario
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Inicio de sesión
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Obtener perfil del usuario
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Cambio de contraseña
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthMessages } = authSlice.actions;

export default authSlice.reducer;
