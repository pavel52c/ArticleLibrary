import React from "react";
import "./LinkItem.scss";
import { LinkModel } from "../../model/LinkModel";
import Heading from "../../../../shared/ui/Heading/Heading";
import Paragraph from "../../../../shared/ui/Paragraph/Paragraph";

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
