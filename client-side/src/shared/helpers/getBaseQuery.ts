import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

export const BASE_URL = "http://localhost:1337";

interface axiosBaseQueryProps {
  baseUrl?: string;
  additionalApiName?: string;
}

interface BaseQueryFnProps {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

const jwtToken = localStorage.getItem("accessToken");

const headers = {
  authorization: `Bearer ${jwtToken}`,
  "Content-Type": "application/json",
};

export const axiosBaseQuery =
  ({
    baseUrl = BASE_URL,
    additionalApiName,
  }: axiosBaseQueryProps): BaseQueryFn<BaseQueryFnProps, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    try {
      const request = `${baseUrl}${
        additionalApiName ? `/${additionalApiName}` : ""
      }${url}`;
      const result = await axios({
        url: request,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
