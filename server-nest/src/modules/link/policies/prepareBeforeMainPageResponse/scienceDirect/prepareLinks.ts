import { scienceDirectLinksMainPage } from '../constants/scienceDirectLinksMainPage';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DOMParser = require('universal-dom-parser');

const parseTextFromTag = (block: string) => block.split('>')[1].split('<')[0];

const prepareLinks = (links: string[]) => {
  const parser = new DOMParser();
  const { linkTarget, descriptionTarget } = scienceDirectLinksMainPage;
  const resultLinks = [];
  links.map((link) => {
    const linkBlockHTML = parser.parseFromString(link, 'text/html');

    const links = Array.from(
      linkBlockHTML.getElementsByTagName(linkTarget),
    ).map((link) => link as HTMLLinkElement);

    const descriptions = Array.from(
      linkBlockHTML.getElementsByClassName(descriptionTarget),
    ).map((text) => parseTextFromTag((text as HTMLSpanElement).innerHTML));

    links.map((link, index) =>
      resultLinks.push({
        url: link.href,
        description: descriptions[index],
      }),
    );
  });
  return resultLinks;
};

export default { prepareLinks };
