import puppeteer from 'puppeteer';
import { webSitesForMainPage } from '../constants/webSitesForMainPage';
import { prepareBeforeMainPageResponse } from './prepareBeforeMainPageResponse';

export const parseMainPage = async () => {
  const links = [];
  for (const webSite of webSitesForMainPage) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(webSite.url);
    await page.waitForTimeout(1000);
    const result = await page.evaluate((webSite) => {
      return {
        webSite,
        links: Array.from(document.querySelectorAll(webSite.linksBlock)).map(
          (div) => (div as HTMLDivElement).innerHTML,
        ),
      };
    }, webSite);
    await browser.close();
    links.push(result);
  }

  return prepareBeforeMainPageResponse(links);
};
