import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "@/shared/helpers/getBaseQuery";
import { LinkModel, WebSiteModel } from "../model/LinkModel";
import { requestMethods } from "@/shared/helpers/requestMethods";

export const LinkApi = createApi({
  reducerPath: "LinkApi",
  tagTypes: ["Link"],
  endpoints: (build) => ({
    parseInput: build.mutation<LinkModel[], string>({
      query: (url) => ({
        url: "/links/input",
        method: requestMethods.POST,
        data: { url },
      }),
    }),
    getWebSites: build.query<WebSiteModel[], void>({
      query: () => ({
        url: "/links/websites",
        method: requestMethods.GET,
      }),
    }),
    getLinksForMainPage: build.mutation<LinkModel[], void>({
      query: () => ({
        url: "/mainPage",
        method: requestMethods.GET,
      }),
    }),
  }),
  baseQuery: axiosBaseQuery({}),
});

export const {
  useParseInputMutation: useParseInput,
  useGetWebSitesQuery: useGetWebSites,
  useGetLinksForMainPageMutation: useGetLinksForMainPage,
} = LinkApi;
