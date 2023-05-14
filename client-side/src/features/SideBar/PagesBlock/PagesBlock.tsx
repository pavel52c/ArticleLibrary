import React from "react";
import { MainPageImg } from "@/shared/public/images";
import { FavoriteArticlesImg } from "@/shared/public/images";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import "./PagesBlock.scss";
import classNames from "classnames";
import { useLocation } from "react-router";

interface PagesBlockProps {}

const pages = [
  {
    url: "/",
    Image: MainPageImg,
    description: "Главная страница",
  },
  {
    url: "/articles",
    Image: FavoriteArticlesImg,
    description: "Сохраненные статьи",
  },
];

export const PagesBlock: React.FC<PagesBlockProps> = () => {
  const { pathname } = useLocation();

  return (
    <ul className="PagesBlock">
      {pages.map(({ url, Image, description }) => (
        <li key={url}>
          <a
            href={url}
            className={classNames("PagesBlock__item", {
              "PagesBlock__item--active": pathname === url,
            })}
          >
            <Image />
            <Paragraph size="xl" mode="semibold">
              {description}
            </Paragraph>
          </a>
        </li>
      ))}
    </ul>
  );
};
