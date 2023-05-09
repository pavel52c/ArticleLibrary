import puppeteer from 'puppeteer';
import { webSites } from '../constants/webSites';
import { getWebsiteByUrl } from '../../article/policies/getWebsiteByUrl';

export const parseFromInput = async ({ url, webSite = '', offset = 0 }) => {
  const parse = async (webSite) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`${webSite.url}${url.replaceAll(' ', webSite.separator)}`);
    await page.waitForTimeout(1000);
    const result = await page.evaluate((webSite) => {
      const links = document.querySelectorAll(webSite.linkTarget);
      const tmp = Array.from(links).map((link) => link as HTMLLinkElement);
      const values = tmp.map((link) => ({
        title: link.innerText,
        href: link.href,
      }));

      return [...values.slice(offset, offset + 5)];
    }, webSite);

    await browser.close();
    return result;
  };
  const candidate = getWebsiteByUrl(webSite);

  if (candidate) {
    const webSiteLinksForParse = webSites.find((website) =>
      website.url.includes(candidate.name),
    );
    if (webSiteLinksForParse) return await parse(webSiteLinksForParse);
  } else {
    const links = [];
    for (const webSite of webSites) {
      links.push(...(await parse(webSite)));
    }
    return links;
  }
};
