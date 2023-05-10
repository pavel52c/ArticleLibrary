import React from "react";
import { LinkModel } from "@/entities/Link/model/LinkModel";
import Heading from "@/shared/ui/Heading/Heading";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import "./LinkItem.scss";

export const LinkItem = ({ url, description, title }: LinkModel) => {
  return (
    <div className="LinkItem">
      <Heading size="m" mode="medium">
        <a href={url} target="_blank">
          {title}
        </a>
      </Heading>
      <Paragraph
        mode="medium"
        colorMode="gray"
        className="LinkItem__description"
      >
        {description}
      </Paragraph>
    </div>
  );
};
