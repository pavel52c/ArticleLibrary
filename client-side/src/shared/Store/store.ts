import { configureStore } from "@reduxjs/toolkit";
import { UserApi } from "../../entities/User/api/UserService";
import { rootReducer } from "./rootReducer";
import { ArticleApi } from "../../entities/Article/api/articleService";
import { LinkApi } from "../../entities/Link/api/LinkService";
import { AuthApi } from "../../entities/Auth/api/authService";

export const middlewares = [
  UserApi.middleware,
  ArticleApi.middleware,
  LinkApi.middleware,
  AuthApi.middleware,
];

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares),
  });

const store = setupStore();

export const getState = store?.getState;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
