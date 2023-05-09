import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../models/User/UserModel";

interface SearchState {
  search: string;
  webSite: string;
}

const initialState: SearchState = {
  search: "",
  webSite: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state: SearchState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setWebSite: (state: SearchState, action: PayloadAction<string>) => {
      state.webSite = action.payload;
    },
  },
});

export const SearchReducer = searchSlice.reducer;
export const SearchActions = searchSlice.actions;
