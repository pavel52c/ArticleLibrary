import { UserModel } from "../../models/User/UserModel";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../helpers/getBaseQuery";
import { CreateUserDto } from "../../models/User/CreateUserDto";
import { requestMethods } from "../helpers/requestMethods";

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
