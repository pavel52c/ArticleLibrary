import { webSiteNames } from '../../../article/constants/websites';
import ScienceDirectPrepare from './scienceDirect/prepareLinks';

interface parseMainPageWebSiteModel {
  name: string;
  url: string;
  linksBlock: string;
}

interface prepareBeforeMainPageResponseProps {
  webSite: parseMainPageWebSiteModel;
  links: string[];
}

export const prepareBeforeMainPageResponse = (
  rawData: prepareBeforeMainPageResponseProps[],
) => {
  const resultLinks = [];

  rawData.map(({ webSite, links }) => {
    switch (webSite.name) {
      case webSiteNames.scienceDirect:
        resultLinks.push(...ScienceDirectPrepare.prepareLinks(links));
        return;
      default:
        return;
    }
  });
  return resultLinks;
};
