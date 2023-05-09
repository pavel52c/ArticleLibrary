import { UserModel } from "../model/UserModel";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../../../shared/helpers/getBaseQuery";
import { CreateUserDto } from "../model/CreateUserDto";
import { requestMethods } from "../../../shared/helpers/requestMethods";

export const UserApi = createApi({
  reducerPath: "UserAPI",
  tagTypes: ["User"],
  endpoints: (build) => ({
    getAllUsers: build.query<UserModel[], void>({
      query: () => ({ url: "", method: requestMethods.GET }),
    }),
    getUser: build.query<UserModel, string>({
      query: (username: string) => ({
        url: `/${username}`,
        method: requestMethods.GET,
        providesTags: ["getUser"],
      }),
    }),
    createUser: build.query<UserModel, CreateUserDto>({
      query: (userData: CreateUserDto) => ({
        url: `/create`,
        method: requestMethods.POST,
        data: userData,
      }),
    }),
  }),
  baseQuery: axiosBaseQuery({ additionalApiName: "users" }),
});

export const { useCreateUserQuery, useGetAllUsersQuery, useGetUserQuery } =
  UserApi;
