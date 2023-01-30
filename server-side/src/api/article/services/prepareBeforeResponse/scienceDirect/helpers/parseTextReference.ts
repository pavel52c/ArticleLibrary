import DOMParser from "universal-dom-parser";
import { isEmpty } from "lodash";

export const parseTextReference = (
  spanReferences: string[],
  divReferences: string[]
) => {
  if (spanReferences[0]) {
    return spanReferences[0];
  }
  if (!isEmpty(divReferences)) {
    const parser = new DOMParser();
    const divReferencesHTML = parser.parseFromString(
      divReferences[0],
      "text/html"
    );
    const articleTitle = (
      Array.from(
        divReferencesHTML.getElementsByTagName("strong")
      )[0] as HTMLParagraphElement
    ).innerHTML;
  }
};
