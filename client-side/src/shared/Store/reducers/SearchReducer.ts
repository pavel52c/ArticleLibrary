import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkModel } from "@/entities/Link/model/LinkModel";

interface SearchState {
  search: string;
  webSite: string;
  links: LinkModel[];
  isLoading: boolean;
  error: string;
}

const initialState: SearchState = {
  search: "",
  webSite: "",
  links: [],
  isLoading: false,
  error: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setStartLoading: (state: SearchState) => {
      state.isLoading = true;
    },
    setEndLoading: (state: SearchState) => {
      state.isLoading = false;
    },
    setData: (state: SearchState, action: PayloadAction<LinkModel[]>) => {
      state.links = action.payload;
      state.isLoading = false;
    },
    addData: (state: SearchState, action: PayloadAction<LinkModel[]>) => {
      state.links = [...state.links, ...action.payload];
      state.isLoading = false;
    },
    setSearch: (state: SearchState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setWebSite: (state: SearchState, action: PayloadAction<string>) => {
      state.webSite = action.payload;
    },
    setError: (state: SearchState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const SearchReducer = searchSlice.reducer;
export const SearchActions = searchSlice.actions;
