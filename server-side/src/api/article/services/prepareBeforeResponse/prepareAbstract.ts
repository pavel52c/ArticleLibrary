import { isEmpty } from "lodash";
import DOMParser from "universal-dom-parser";
import { AbstractChunk, AbstractProps } from "../../models/AbstractModel";

export const prepareAbstract = ({
  abstract,
  abstractParse,
}: AbstractProps): AbstractChunk[] => {
  const parser = new DOMParser();
  const { heading, text: textParse } = abstractParse;
  return abstract.map((abs) => {
    const abstractHTML = parser.parseFromString(abs, "text/html");
    const title = Array.from(abstractHTML.getElementsByTagName(heading)).map(
      (heading) => (heading as HTMLHeadingElement).innerHTML
    );
    const text = Array.from(abstractHTML.getElementsByTagName(textParse)).map(
      (paragraph) => (paragraph as HTMLParagraphElement).innerHTML
    );
    return {
      title: isEmpty(title) ? "" : title[0],
      text: text[0],
    };
  });
};
// We take first element, because already slice abstract section with pairs {title, text}
