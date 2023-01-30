import puppeteer from "puppeteer";
import { prepareBeforeResponse } from "./prepareBeforeResponse";
import { webSites } from "../constants/websites";

const parseArticle = async ({ url }) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForTimeout(1000);

  const result = await page.evaluate((webSites) => {
    const header = (
      document.querySelector(webSites[0].header) as HTMLHeadingElement
    ).innerText;
    const abstract = Array.from(
      document.querySelectorAll("#abstracts > .abstract > div")
    ).map((div) => (div as HTMLDivElement).innerHTML);
    const referenceSection = Array.from(
      document.querySelectorAll(".references > dd")
    ).map((reference) => (reference as HTMLDListElement).innerHTML);

    return {
      header,
      abstract,
      referenceSection,
    };
  }, webSites);

  await browser.close();
  return prepareBeforeResponse({ ...result, webSite: webSites.scienceDirect });
};

export default {
  parseArticle,
};
