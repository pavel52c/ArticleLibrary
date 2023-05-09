import { webSites } from '../constants/websites';

export const getWebsiteByUrl = (url) =>
  webSites.find((webSite) => url.includes(webSite.name));
