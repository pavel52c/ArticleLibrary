import React, { useState } from "react";
import { useAppSelector } from "@/shared/Store/hooks/reduxHooks";
import { SearchBlock } from "@/widgets/SearchBlock/ui/SearchBlock";
import { ArticleModel } from "@/entities/Article/model/ArticleModel";
import { ContentLoadingWrapper } from "@/widgets/ContentLoadingWrapper/ContentLoadingWrapper";
import { LinkItem } from "@/entities/Link/ui/LinkItem/LinkItem";
import "./FavoriteArticlesPage.scss";
import { ArticleTagsGroup } from "@/widgets";

export const FavoriteArticlesPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  // const { articles } = useAppSelector((state) => state.profile);

  const onSubmit = () => {};

  const filterFunction = (article: ArticleModel) =>
    article.title?.includes(search);

  const searchBlockProps = {
    onChange: (value: string) => setSearch(value),
    onSubmit,
  };

  const articles = [
    {
      title:
        "Application of data mining combined with power data in assessment and prevention of regional atmospheric pollution",
      description: "Energy Reports 22 February 2023",
      tags: [
        {
          id: 0,
          tag: "data mining",
        },
      ],
    },
    {
      title:
        "Sequential data mining of infection patterns as predictors for onset of type 1 diabetes in genetically at-risk individuals",
      description:
        "International Journal of Educational DevelopmentAvailable online 19 May 2023",
      tags: [
        {
          id: 0,
          tag: "data mining",
        },
      ],
    },
    {
      title:
        "Smart Trip Prediction Model for Metro Traffic Control Using Data Mining Techniques",
      description: "Procedia Computer Science13 January 2023",
      tags: [
        {
          id: 0,
          tag: "data mining",
        },
      ],
    },
    {
      title:
        "An enhanced deterministic K-Means clustering algorithm for cancer subtype prediction from gene expression data",
      description: "Computers in Biology and Medicine1 December 2017",
      tags: [
        {
          id: 1,
          tag: "k-means",
        },
      ],
    },
    {
      title:
        "Classification of Indian power coals using K-means clustering and Self Organizing Map neural network",
      description: "FuelJanuary 2011",
      tags: [
        {
          id: 1,
          tag: "k-means",
        },
      ],
    },
    {
      title:
        "A DT-CWT and Data mining based approach for High Impedance Fault Diagnosis in Micro-grid System",
      description: "Procedia Computer Science13 January 2023",
      tags: [
        {
          id: 0,
          tag: "data-minig",
        },
      ],
    },
  ];

  return (
    <div className="FavoriteArticlesPage">
      <SearchBlock {...searchBlockProps} />
      <ContentLoadingWrapper>
        <ul className="FavoriteArticlesPage__list">
          {articles.filter(filterFunction).map((article: ArticleModel) => (
            <li key={article.title} className="FavoriteArticlesPage__item">
              <LinkItem url="" title={article.title} />
              <ArticleTagsGroup tags={article.tags} />
            </li>
          ))}
        </ul>
      </ContentLoadingWrapper>
    </div>
  );
};
