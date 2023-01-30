import {
  ReferenceModel,
  ReferenceProps,
} from "../../../../models/referencesModel";
import DOMParser from "universal-dom-parser";
import { isEmpty, remove } from "lodash";
import { parseTextReference } from "../helpers/parseTextReference";
import { scienceDirect } from "../constants";

export const prepareReferences = ({
  referenceSection,
}: ReferenceProps): ReferenceModel[] => {
  const parser = new DOMParser();
  const {
    reference: { text: textParse, link },
  } = scienceDirect;
  const tmpReferences = referenceSection.map((reference) => {
    const referenceHTML = parser.parseFromString(reference, "text/html");
    const text = Array.from(referenceHTML.getElementsByTagName(textParse)).map(
      (text) => (text as HTMLSpanElement).innerHTML
    );
    const anotherText = Array.from(
      referenceHTML.getElementsByClassName("contribution")
    ).map((text) => (text as HTMLDivElement).innerHTML);
    const resultText = parseTextReference(text, anotherText);
    const links = Array.from(referenceHTML.getElementsByTagName(link)).map(
      (link) => (link as HTMLLinkElement).href
    );
    if (text[0])
      return {
        text: text[0],
        link: links.find((link) => link.includes("scholar.google")) || "",
      };
    if (anotherText[0])
      return {
        text: anotherText[0],
        link: links.find((link) => link.includes("scholar.google")) || "",
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
