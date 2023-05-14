import React, { useState } from "react";
import { useAppSelector } from "@/shared/Store/hooks/reduxHooks";
import { SearchBlock } from "@/widgets/SearchBlock/ui/SearchBlock";
import { ArticleModel } from "@/entities/Article/model/ArticleModel";
import { ContentLoadingWrapper } from "@/widgets/ContentLoadingWrapper/ContentLoadingWrapper";
import { LinkItem } from "@/entities/Link/ui/LinkItem/LinkItem";
import "./FavoriteArticlesPage.scss";
import { ArticleTag } from "@/entities/ArticleTag/ui/ArticleTag";

export const FavoriteArticlesPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  // const { articles } = useAppSelector((state) => state.profile);

  const onSubmit = () => {};

  const filterFunction = (article: ArticleModel) =>
    article.title.includes(search);

  const searchBlockProps = {
    onChange: (value: string) => setSearch(value),
    onSubmit,
  };

  const articles = [
    {
      title:
        "Nicotinamide mononucleotide (NMN) as an anti-aging health product – Promises and safety concerns",
      references: [
        {
          title:
            "United Nations (UN), Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights (ST/ESA/SER.A/430). New York, USA: United Nations; 2019.",
          description: "",
          links: [
            {
              url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
              title: "Google Scholar",
            },
          ],
        },
        {
          title:
            "Age and age-related diseases: role of inflammation triggers and cytokines",
          description: "Front Immunol, 9 (2018), p. 586",
          links: [
            {
              url: "https://www.scopus.com/inward/record.url?eid=2-s2.0-85045243128&partnerID=10&rel=R3.0.0",
              title: "View in Scopus",
            },
            {
              url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
              title: "Google Scholar",
            },
          ],
        },
        {
          title: "Aging and anti-aging: a combo-endocrinology overview",
          description: "Eur J Endocrinol, 176 (2017), pp. 283-308",
          links: [
            {
              url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
              title: "Google Scholar",
            },
          ],
        },
        {
          title:
            "Anti-aging medicine: the legal issues: legal issues associated with the current and future practice of anti-aging medicine",
          description:
            "J Gerontol A Biol Sci Med Sci, 59 (7) (2004), pp. B674-B681",
          links: [
            {
              url: "https://www.scopus.com/inward/record.url?eid=2-s2.0-85045243128&partnerID=10&rel=R3.0.0",
              title: "View in Scopus",
            },
            {
              url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
              title: "Google Scholar",
            },
          ],
        },
      ],
      tags: [
        {
          tag: "Химия",
          id: 1,
        },
      ],
    },
    {
      title:
        "The “Resus:Station”: The use of clinical simulations in a randomised crossover study to evaluate a novel resuscitation trolley",
      references: [
        {
          title:
            "United Nations (UN), Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights (ST/ESA/SER.A/430). New York, USA: United Nations; 2019.",
          description: "",
          links: [
            {
              url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
              title: "Google Scholar",
            },
          ],
        },
        {
          title:
            "Age and age-related diseases: role of inflammation triggers and cytokines",
          description: "Front Immunol, 9 (2018), p. 586",
          links: [
            {
              url: "https://www.scopus.com/inward/record.url?eid=2-s2.0-85045243128&partnerID=10&rel=R3.0.0",
              title: "View in Scopus",
            },
            {
              url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
              title: "Google Scholar",
            },
          ],
        },
        {
          title: "Aging and anti-aging: a combo-endocrinology overview",
          description: "Eur J Endocrinol, 176 (2017), pp. 283-308",
          links: [
            {
              url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
              title: "Google Scholar",
            },
          ],
        },
        {
          title:
            "Anti-aging medicine: the legal issues: legal issues associated with the current and future practice of anti-aging medicine",
          description:
            "J Gerontol A Biol Sci Med Sci, 59 (7) (2004), pp. B674-B681",
          links: [
            {
              url: "https://www.scopus.com/inward/record.url?eid=2-s2.0-85045243128&partnerID=10&rel=R3.0.0",
              title: "View in Scopus",
            },
            {
              url: "https://scholar.google.com/scholar?q=United Nations , Department of Economic and Social Affairs, Population Division. World population ageing 2019: highlights . New York, USA: United Nations; 2019.",
              title: "Google Scholar",
            },
          ],
        },
      ],
      tags: [
        {
          tag: "Медицина",
          id: 1,
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
              <LinkItem
                url=""
                title={article.title}
                description={article.title}
              />
              <ArticleTag {...article.tags[0]} />
            </li>
          ))}
        </ul>
      </ContentLoadingWrapper>
    </div>
  );
};
