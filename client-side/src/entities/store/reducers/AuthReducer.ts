import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
  error: string;
  isLoading: boolean;
  username: string;
}

const initialState: AuthState = {
  isLogin: false,
  error: "",
  isLoading: false,
  username: "",
};

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData: (state: AuthState, action: PayloadAction<AuthResponse>) => {
      state.isLogin = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.error = "";
    },
    setLogin: (state: AuthState) => {
      state.isLogin = true;
      state.error = "";
    },
    setLogout: (state: AuthState) => {
      state.isLogin = false;
      state.username = initialState.username;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setStartLoading: (state: AuthState) => {
      state.isLoading = true;
    },
    setEndLoading: (state: AuthState) => {
      state.isLoading = false;
    },
    setError: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setUsername: (state: AuthState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const AuthReducer = authSlice.reducer;
export const AuthActions = authSlice.actions;
