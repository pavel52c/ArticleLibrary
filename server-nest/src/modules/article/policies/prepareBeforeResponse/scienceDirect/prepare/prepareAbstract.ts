import { isEmpty } from 'lodash';
import { scienceDirect } from '../constants';
import { ParseAbstractsDto } from '../../../../dto/parse/parse-abstracts.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DOMParser = require('universal-dom-parser');

export const prepareAbstract = (abstracts: string[]): ParseAbstractsDto[] => {
  // const parser = ;
  return abstracts.map((abs) => {
    const {
      abstract: { heading, text: textParse },
    } = scienceDirect;
    const abstractHTML = new DOMParser().parseFromString(abs, 'text/html');
    const title = Array.from(abstractHTML.getElementsByTagName(heading)).map(
      (heading) => (heading as HTMLHeadingElement).innerHTML,
    );
    const text = Array.from(abstractHTML.getElementsByTagName(textParse)).map(
      (paragraph) => (paragraph as HTMLParagraphElement).innerHTML,
    );
    return {
      title: isEmpty(title) ? '' : title[0],
      description: text[0],
    };
  });
};
// We take first element, because already slice abstract section with pairs {title, text}
