import React from "react";
import "./ReferencesSection.scss";
import { ReferenceModel } from "@/entities/Reference/model/ReferenceModel";
import Heading from "@/shared/ui/Heading/Heading";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";

interface ReferencesSectionProps {
  references: ReferenceModel[];
}

export const ReferenceSection: React.FC<ReferencesSectionProps> = ({
  references,
}) => (
  <div className="ReferencesSection">
    <Heading size="l" mode="medium">
      References
    </Heading>
    <ul className="ReferencesSection__list">
      {references.map((reference, index) => (
        <li
          key={`${index}) ${reference.title}`}
          className="ReferencesSection__item"
        >
          <Paragraph size="xl" mode="medium">
            {reference.title}
          </Paragraph>
          {reference.description && (
            <Paragraph colorMode="gray" size="l" mode="medium">
              {reference.description}
            </Paragraph>
          )}
          <ul className="ReferencesSection__links">
            {reference.links.map((link) => (
              <a href={link.url}>
                <Paragraph>{link.title}</Paragraph>
              </a>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
);
