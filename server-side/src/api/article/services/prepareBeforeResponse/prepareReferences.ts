import { ReferenceModel, ReferenceProps } from "../../models/referencesModel";
import DOMParser from "universal-dom-parser";
import { isEmpty, remove } from "lodash";

export const prepareReferences = ({
  referenceSection,
  referenceParse,
}: ReferenceProps): ReferenceModel[] => {
  const parser = new DOMParser();
  const { text: textParse, link } = referenceParse;
  const tmpReferences = referenceSection.map((reference) => {
    const referenceHTML = parser.parseFromString(reference, "text/html");
    const text = Array.from(referenceHTML.getElementsByTagName(textParse)).map(
      (text) => (text as HTMLSpanElement).innerHTML
    );
    const links = Array.from(referenceHTML.getElementsByTagName(link)).map(
      (link) => (link as HTMLLinkElement).href
    );
    if (text[0])
      return {
        text: text[0],
        link: links[0].includes("scholar.google") ? links[0] : "",
      };
    return {
      text: "",
      link: "",
    };
  });

  return remove(
    [...new Set(tmpReferences)],
    (el) => !isEmpty(el.text) && !isEmpty(el.link)
  );
};
//Поработать с ссылками. Сейчас выбираются только со span, однако нужно ещё брать с div
