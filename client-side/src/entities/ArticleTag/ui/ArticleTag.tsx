import React from "react";
import { ArticleTagModel } from "@/entities/ArticleTag/model/ArticleTagModel";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import "./ArticleTag.scss";

type ArticleTagProps = ArticleTagModel;

export const ArticleTag: React.FC<ArticleTagProps> = ({ tag }) => (
  <Paragraph size="l" mode="medium" className="ArticleTag">
    {tag}
  </Paragraph>
);
