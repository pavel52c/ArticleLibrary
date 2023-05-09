import { isEmpty } from 'lodash';
import { scienceDirect } from '../constants';
import { ParseReferencesDto } from '../../../../dto/parse/parse-references.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DOMParser = require('universal-dom-parser');

export const prepareReferences = (
  references: string[],
): ParseReferencesDto[] => {
  const parser = new DOMParser();
  const {
    reference: { referenceAuthor, referenceTitle },
  } = scienceDirect;

  return references
    .map((reference) => {
      const referenceHTML = parser.parseFromString(reference, 'text/html');

      const authors = Array.from(
        referenceHTML.getElementsByClassName(referenceAuthor),
      ).map((author) => (author as HTMLDivElement).innerHTML);

      const title = Array.from(
        referenceHTML.getElementsByClassName(referenceTitle),
      ).map((author) => (author as HTMLDivElement).innerHTML);

      const links = Array.from(referenceHTML.getElementsByTagName('a'))
        .map((link) => {
          const text = Array.from(
            referenceHTML.getElementsByTagName('span'),
          ).map((linkText) => (linkText as HTMLSpanElement).innerHTML);
          return {
            url: (link as HTMLLinkElement).href,
            description: !isEmpty(text) ? text[0] : '',
          };
        })
        .filter(
          (link) =>
            !isEmpty(link.url) &&
            !isEmpty(link.description) &&
            link.url.includes('https'),
        );

      return {
        title: !isEmpty(title) ? title[0] : '',
        description: !isEmpty(authors) ? authors[0] : '',
        links,
      };
    })
    .slice(10);
};
