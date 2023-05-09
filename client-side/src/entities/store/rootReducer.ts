import { combineReducers } from "@reduxjs/toolkit";
import { UsersReducer } from "./reducers/UserReducer";
import { UserApi } from "../services/user/UserService";
import { ArticleApi } from "../services/article/articleService";
import { LinkApi } from "../services/link/LinkService";
import { AuthReducer } from "./reducers/AuthReducer";
import { AuthApi } from "../services/auth/authService";
import { SearchReducer } from "./reducers/SearchReducer";
import { ModalReducer } from "./reducers/ModalReducer";
import { ProfileReducer } from "./reducers/ProfileReducer";

export const rootReducer = combineReducers({
  users: UsersReducer,
  auth: AuthReducer,
  search: SearchReducer,
  modal: ModalReducer,
  profile: ProfileReducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [ArticleApi.reducerPath]: ArticleApi.reducer,
  [LinkApi.reducerPath]: LinkApi.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
});
