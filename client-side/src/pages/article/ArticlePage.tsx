import React from "react";
import { useParams } from "react-router";

export const ArticlePage = () => {
  const { articleId } = useParams();

  return <div>ARTICLEPAGE</div>;
};
