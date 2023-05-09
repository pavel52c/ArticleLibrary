import { configureStore } from "@reduxjs/toolkit";
import { UserApi } from "../services/user/UserService";
import { rootReducer } from "./rootReducer";
import { ArticleApi } from "../services/article/articleService";
import { LinkApi } from "../services/link/LinkService";
import { AuthApi } from "../services/auth/authService";

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
