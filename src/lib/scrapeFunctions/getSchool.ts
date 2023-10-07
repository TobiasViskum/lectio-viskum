import puppeteer from "puppeteer";
import { cache } from "react";

export const revalidate = 86400;

type Props = { schoolCode: string };

export const getSchool = cache(async ({ schoolCode }: Props) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.lectio.dk/lectio/login_list.aspx");

  let school: School | null = null;
  try {
    school = await page.$eval(`a[href*="${schoolCode}"]`, (a) => {
      return { href: a.href, schoolCode: a.href.match(/[0-9]+/)![0], name: a.text };
    });
  } catch {
    return null;
  }

  await page.browser().close();

  if (school === null) return null;

  return school;
});
