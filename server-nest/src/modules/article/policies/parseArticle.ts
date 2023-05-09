import puppeteer from 'puppeteer';
import { prepareBeforeResponse } from './prepareBeforeResponse';
import { getWebsiteByUrl } from './getWebsiteByUrl';

export const parseArticle = async ({ url }) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForTimeout(1000);
  const webSite = getWebsiteByUrl(url);

  const result = await page.evaluate((webSite) => {
    const title = (document.querySelector(webSite.header) as HTMLHeadingElement)
      .innerText;
    const abstracts = Array.from(
      document.querySelectorAll(webSite.abstract.wrapper),
    ).map((div) => (div as HTMLDivElement).innerHTML);
    let references = Array.from(
      document.querySelectorAll(webSite.reference.wrapper),
    ).map((reference) => (reference as HTMLDivElement).innerHTML);

    if (references.length === 0) {
      references = Array.from(
        document.querySelectorAll(webSite.reference.additionalWrapper),
      ).map((reference) => (reference as HTMLDivElement).innerHTML);
    }

    return {
      title,
      abstracts,
      references,
    };
  }, webSite);

  await browser.close();

  return prepareBeforeResponse({ ...result, webSite: webSite.name });
};
