import { axiosBaseQuery } from "../helpers/getBaseQuery";
import { CreateUserDto } from "../../models/User/CreateUserDto";
import {
  createApi,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query/react";
import { AuthResponseModel } from "../../models/Auth/AuthResponseModel";
import { UserModel } from "../../models/User/UserModel";
import { requestMethods } from "../helpers/requestMethods";

export const AuthApi = createApi({
  baseQuery: axiosBaseQuery({}),
  reducerPath: "AuthApi",
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    login: build.mutation<UserModel, CreateUserDto>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const loginRes = await fetchWithBQ({
          url: "/login",
          method: requestMethods.POST,
          data: _arg,
        });
        if (loginRes.error)
          return { error: loginRes.error as FetchBaseQueryError };
        const authRes = loginRes.data as AuthResponseModel;
        localStorage.setItem("accessToken", authRes.accessToken);
        localStorage.setItem("refreshToken", authRes.refreshToken);
        const result = await fetchWithBQ({
          url: "/profile",
          method: requestMethods.GET,
        });
        return result.data
          ? { data: result.data as UserModel }
          : { error: result.error as FetchBaseQueryError };
      },
    }),
    registration: build.mutation<UserModel, CreateUserDto>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const loginRes = await fetchWithBQ({
          url: "/registration",
          method: requestMethods.POST,
          data: _arg,
        });
        if (loginRes.error)
          return { error: loginRes.error as FetchBaseQueryError };
        const authRes = loginRes.data as AuthResponseModel;
        localStorage.setItem("accessToken", authRes.accessToken);
        localStorage.setItem("refreshToken", authRes.refreshToken);
        const result = await fetchWithBQ({
          url: "/profile",
          method: requestMethods.GET,
        });
        return result.data
          ? { data: result.data as UserModel }
          : { error: result.error as FetchBaseQueryError };
      },
    }),
    refreshToken: build.query<AuthResponseModel, string>({
      query: (data: string) => ({
        url: "/refreshToken",
        method: requestMethods.POST,
        data: data,
      }),
    }),
    profile: build.query<UserModel, void>({
      query: () => ({
        url: "/profile",
        method: requestMethods.GET,
      }),
    }),
  }),
});

export const {
  useLoginMutation: useLogin,
  useRegistrationMutation: useRegistration,
  useRefreshTokenQuery: useRefreshToken,
  useProfileQuery: useGetProfile,
} = AuthApi;
