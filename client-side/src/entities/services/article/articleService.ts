import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { ArticleModel } from "../../models/Article/ArticleModel";
import { axiosBaseQuery } from "../helpers/getBaseQuery";
import { requestMethods } from "../helpers/requestMethods";

export const ArticleApi = createApi({
  reducerPath: "ArticleApi",
  tagTypes: ["Article"],
  endpoints: (build) => ({
    parseArticle: build.query<ArticleModel, string>({
      query: (url) => ({
        url: "/parse",
        method: requestMethods.POST,
        body: { url },
      }),
    }),
  }),
  baseQuery: axiosBaseQuery({ additionalApiName: "articles" }),
});

export const { useParseArticleQuery } = ArticleApi;
