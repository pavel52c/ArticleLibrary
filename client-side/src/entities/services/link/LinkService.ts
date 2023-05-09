import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../helpers/getBaseQuery";
import { LinkModel, WebSiteModel } from "../../models/Link/LinkModel";
import { requestMethods } from "../helpers/requestMethods";

export const LinkApi = createApi({
  reducerPath: "LinkApi",
  tagTypes: ["Link"],
  endpoints: (build) => ({
    parseInput: build.query<LinkModel[], string>({
      query: (url) => ({
        url: "/input",
        method: requestMethods.POST,
        data: { url },
      }),
    }),
    getWebSites: build.query<WebSiteModel[], void>({
      query: () => ({
        url: "/websites",
        method: requestMethods.GET,
      }),
    }),
  }),
  baseQuery: axiosBaseQuery({ additionalApiName: "links" }),
});

export const { useParseInputQuery, useGetWebSitesQuery: useGetWebSites } =
  LinkApi;
