import { combineReducers } from "@reduxjs/toolkit";
import {
  AuthReducer,
  ModalReducer,
  ProfileReducer,
  SearchReducer,
  UsersReducer,
} from "@/shared/Store/reducers";
import { UserApi } from "@/entities/User/api/UserService";
import { ArticleApi } from "@/entities/Article/api/articleService";
import { LinkApi } from "@/entities/Link/api/LinkService";
import { AuthApi } from "@/entities/Auth/api/authService";

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
