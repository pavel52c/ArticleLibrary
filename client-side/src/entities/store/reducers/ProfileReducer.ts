import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleModel } from "../../models/Article/ArticleModel";
import { ArticleTagModel } from "../../models/ArticleTag/ArticleTagModel";

interface ProfileState {
  username: string;
  articles: ArticleModel[];
  favoriteTags: ArticleTagModel[];
  banned: boolean;
}

const initialState: ProfileState = {
  username: "",
  articles: [],
  favoriteTags: [],
  banned: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setArticles: (
      state: ProfileState,
      action: PayloadAction<ArticleModel[]>
    ) => {
      state.articles = action.payload;
    },
    setFavoriteTags: (
      state: ProfileState,
      action: PayloadAction<ArticleTagModel[]>
    ) => {
      state.favoriteTags = action.payload;
    },
    setBanned: (state: ProfileState) => {
      state.banned = true;
    },
    setUnBanned: (state: ProfileState) => {
      state.banned = false;
    },
    setUsername: (state: ProfileState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const ProfileReducer = profileSlice.reducer;
export const ProfileActions = profileSlice.actions;
