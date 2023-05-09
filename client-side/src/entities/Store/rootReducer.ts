import { combineReducers } from "@reduxjs/toolkit";
import { UsersReducer } from "./reducers/UserReducer";
import { UserApi } from "../User/api/UserService";
import { ArticleApi } from "../Article/api/articleService";
import { LinkApi } from "../Link/api/LinkService";
import { AuthReducer } from "./reducers/AuthReducer";
import { AuthApi } from "../Auth/api/authService";
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
