import React from "react";
import "./AbstractsSection.scss";
import { AbstractModel } from "@/entities/Abstract/model/AbstractModel";
import { divide } from "lodash";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import Heading from "@/shared/ui/Heading/Heading";

interface AbstractsSectionProps {
  abstracts: AbstractModel[];
}

export const AbstractsSection: React.FC<AbstractsSectionProps> = ({
  abstracts,
}) => (
  <ul className="AbstractsSection">
    {abstracts.map((abstract) => (
      <li key={abstract.title} className="AbstractsSection__item">
        <Heading size="l" mode="medium">
          {abstract.title}
        </Heading>
        <Paragraph size="xl" colorMode="gray">
          {abstract.description}
        </Paragraph>
      </li>
    ))}
  </ul>
);
