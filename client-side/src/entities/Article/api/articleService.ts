import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { ArticleModel } from "../model/ArticleModel";
import { axiosBaseQuery } from "@/shared/helpers/getBaseQuery";
import { requestMethods } from "@/shared/helpers/requestMethods";

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
