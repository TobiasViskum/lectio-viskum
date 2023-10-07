import puppeteer from "puppeteer";
import { cache } from "react";

export const revalidate = 86400;

export const getSchools = cache(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.lectio.dk/lectio/login_list.aspx");

  let schools: School[] = [];
  try {
    schools = await page.$$eval("#schoolsdiv > div > a", (elements) => {
      return elements.map((a) => {
        return { href: a.href, schoolCode: a.href.match(/[0-9]+/)![0], name: a.text };
      });
    });
  } catch {
    return null;
  }

  await page.browser().close();

  if (schools.length === 0) return null;

  schools = schools.filter((school) => school.name !== "Vis alle skoler");

  return schools;
});
