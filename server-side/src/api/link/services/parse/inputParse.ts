import puppeteer from "puppeteer";
import { webSites } from "../../constants/webSites";

export const inputParse = async (inputValue) => {
  const links = [];
  for (const webSite of webSites) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(`${webSite.url}${inputValue.replaceAll(' ', webSite.separator)}`);
    await page.waitForTimeout(1000);
    const result = await page.evaluate((webSite) => {
      const links = document.querySelectorAll(webSite.linkTarget);
      const tmp = Array.from(links).map(link => link as HTMLLinkElement);
      const values = [];
      tmp.map(link => values.push({ title: link.innerText, href: link.href }));
      return {
       ...values.slice(0,3),
      }
    }, webSite)

    await browser.close();
    links.push(result);
  }
  return links;
}
