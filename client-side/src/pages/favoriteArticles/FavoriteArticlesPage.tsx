import React, { useState } from "react";
import { useAppSelector } from "@/shared/Store/hooks/reduxHooks";
import { SearchBlock } from "@/widgets/SearchBlock/ui/SearchBlock";
import { ArticleModel } from "@/entities/Article/model/ArticleModel";
import { ContentLoadingWrapper } from "@/widgets/ContentLoadingWrapper/ContentLoadingWrapper";
import { LinkItem } from "@/entities/Link/ui/LinkItem/LinkItem";
import "./FavoriteArticlesPage.scss";

export const FavoriteArticlesPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { articles } = useAppSelector((state) => state.profile);

  const onSubmit = () => {};

  const filterFunction = (article: ArticleModel) =>
    article.title.includes(search);

  const searchBlockProps = {
    onChange: (value: string) => setSearch(value),
    onSubmit,
  };

  return (
    <div className="FavoriteArticlesPage">
      <SearchBlock {...searchBlockProps} />
      <ContentLoadingWrapper>
        <ul>
          {articles.filter(filterFunction).map((article: ArticleModel) => (
            <li key={article.title}>
              <LinkItem
                url=""
                title={article.title}
                description={article.title}
              />
            </li>
          ))}
        </ul>
      </ContentLoadingWrapper>
    </div>
  );
};
