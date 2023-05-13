import React from "react";
import "./ArticleTag.scss";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";

interface ArticleTagProps {
  children: React.ReactNode;
}

export const ArticleTag: React.FC<ArticleTagProps> = ({ children }) => (
  <Paragraph size="l" mode="medium" className="ArticleTag">
    {children}
  </Paragraph>
);
