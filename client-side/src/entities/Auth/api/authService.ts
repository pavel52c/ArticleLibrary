import { axiosBaseQuery } from "@/shared/helpers/getBaseQuery";
import { CreateUserDto } from "@/entities/User/model/CreateUserDto";
import {
  createApi,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query/react";
import { AuthResponseModel } from "../model/AuthResponseModel";
import { UserModel } from "@/entities/User/model/UserModel";
import { requestMethods } from "@/shared/helpers/requestMethods";
import { AuthActions, ProfileActions } from "@/shared/Store/reducers";

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
          headers: {
            authorization: `Bearer ${authRes.accessToken}`,
          },
        });
        if (!result.data) return { error: result.error as FetchBaseQueryError };
        _queryApi.dispatch(ProfileActions.setData(result.data as UserModel));
        _queryApi.dispatch(AuthActions.setLogin());
        return { data: result.data as UserModel };
      },
    }),
    registration: build.mutation<UserModel, CreateUserDto>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const registrationRes = await fetchWithBQ({
          url: "/registration",
          method: requestMethods.POST,
          data: _arg,
        });
        if (registrationRes.error)
          return { error: registrationRes.error as FetchBaseQueryError };
        const authRes = registrationRes.data as AuthResponseModel;
        localStorage.setItem("accessToken", authRes.accessToken);
        localStorage.setItem("refreshToken", authRes.refreshToken);
        const result = await fetchWithBQ({
          url: "/profile",
          method: requestMethods.GET,
          headers: {
            authorization: `Bearer ${authRes.accessToken}`,
          },
        });
        if (!result.data) return { error: result.error as FetchBaseQueryError };
        _queryApi.dispatch(ProfileActions.setData(result.data as UserModel));
        _queryApi.dispatch(AuthActions.setLogin());
        return { data: result.data as UserModel };
      },
    }),
    refreshToken: build.mutation<UserModel, { refreshToken: string }>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const refreshRes = await fetchWithBQ({
          url: "/refreshToken",
          method: requestMethods.POST,
          data: _arg,
        });
        if (refreshRes.error)
          return { error: refreshRes.error as FetchBaseQueryError };
        const authRes = refreshRes.data as AuthResponseModel;
        localStorage.setItem("accessToken", authRes.accessToken);
        localStorage.setItem("refreshToken", authRes.refreshToken);
        const result = await fetchWithBQ({
          url: "/profile",
          method: requestMethods.GET,
          headers: {
            authorization: `Bearer ${authRes.accessToken}`,
          },
        });
        if (!result.data) return { error: result.error as FetchBaseQueryError };
        _queryApi.dispatch(ProfileActions.setData(result.data as UserModel));
        _queryApi.dispatch(AuthActions.setLogin());
        return { data: result.data as UserModel };
      },
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
  useRefreshTokenMutation: useRefreshToken,
  useProfileQuery: useGetProfile,
} = AuthApi;
