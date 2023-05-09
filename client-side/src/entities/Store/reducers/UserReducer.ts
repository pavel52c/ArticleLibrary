import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../User/model/UserModel";

interface UserState {
  users: UserModel[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state: UserState, action: PayloadAction<UserModel[]>) => {
      state.users = action.payload;
    },
    setError: (state: UserState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetError: (state: UserState) => {
      state.error = initialState.error;
    },
    setLoading: (state: UserState) => {
      state.isLoading = true;
    },
    resetLoading: (state: UserState) => {
      state.isLoading = false;
    },
  },
});

export const UsersReducer = userSlice.reducer;
export const UsersActions = userSlice.actions;
