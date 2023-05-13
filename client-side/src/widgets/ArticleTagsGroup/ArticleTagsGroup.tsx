import React from "react";
import { ArticleTagModel } from "@/entities/ArticleTag/model/ArticleTagModel";
import { AddTag } from "@/features/AddTag/AddTag";
import { ArticleTag } from "@/entities/ArticleTag/ui/ArticleTag";
import "./ArticleTagsGroup.scss";

interface ArticleTagsGroupProps {
  tags: ArticleTagModel[];
  needToAdd: boolean;
}

export const ArticleTagsGroup: React.FC<ArticleTagsGroupProps> = (props) => {
  const { tags = [], needToAdd = false } = props;

  return (
    <div className="ArticleTagsGroup">
      {needToAdd && <AddTag onAdd={() => console.log("addDing")} />}
      {tags.map((tag) => (
        <ArticleTag {...tag} />
      ))}
    </div>
  );
};
