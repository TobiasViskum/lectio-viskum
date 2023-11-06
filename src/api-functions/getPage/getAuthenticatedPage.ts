import "server-only";
import { load } from "cheerio";
import { getFetchCookie } from "../getFetchCookie";
import { getPageFromMap } from "./page-map";
import { getSchoolBySchoolCode } from "../scrapeFunctions/getSchoolBySchoolCode";

type Props = {
  page?: Pages;
  specificPage?: string;
  lectioCookies: string;
  schoolCode: string;
};

export async function getAuthenticatedPage({
  page,
  specificPage,
  lectioCookies,
  schoolCode,
}: Props) {
  const baseUrl = "https://www.lectio.dk/lectio";
  let targetPage = "";

  if (page) {
    targetPage = getPageFromMap({
      page: page,
    });
  } else if (specificPage) {
    targetPage = specificPage;
  }

  const { fetchCookie } = getFetchCookie();

  const targetPageContent = await fetchCookie(
    `${baseUrl}/${schoolCode}/${targetPage}`,
    {
      method: "GET",
      headers: {
        Cookie: lectioCookies,
      },
    },
  )
    .then(async (res) => {
      try {
        const text = await res.text();

        if (text.includes("Log ind")) {
          return "Not authenticated";
        } else if (text.includes("Der opstod en ukendt fejl")) {
          const school = await getSchoolBySchoolCode({
            schoolCode: schoolCode,
          });

          if (school === null) return "Invalid school";
          return null;
        } else if (text.includes("Server Error")) {
          return "Forbidden access";
        } else {
          return { $: load(text), fetchCookie: fetchCookie };
        }
      } catch {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });

  return targetPageContent;
}
