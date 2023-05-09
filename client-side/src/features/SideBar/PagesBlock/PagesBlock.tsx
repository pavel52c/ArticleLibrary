import React from "react";
import "./PagesBlock.scss";
import { MainPageImg } from "../../../shared/public/images";
import { FavoriteArticlesImg } from "../../../shared/public/images";
import Paragraph from "../../../shared/ui/Paragraph/Paragraph";

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

export const PagesBlock: React.FC<PagesBlockProps> = () => (
  <ul className="PagesBlock">
    {pages.map(({ url, Image, description }) => (
      <li key={url} className="PagesBlock__item">
        <Image />
        <a href={url}>
          <Paragraph size="xl" mode="semibold">
            {description}
          </Paragraph>
        </a>
      </li>
    ))}
  </ul>
);
