import "server-only";
import { load } from "cheerio";
import { getFetchCookie } from "@/lib/getFetchCookie";
import { getPageFromMap } from "./page-map";
import { getSchoolBySchoolCode } from "../scrapeFunctions/getSchoolBySchoolCode";
import { standardFetchOptions } from "../standardFetchOptions";
import { getLastAuthenticatedCookie } from "../getLastAuthenticatedCookie";
import { getLectioProps } from "@/lib/auth/getLectioProps";

type Props = {
  page?: Pages;
  specificPage?: string;
};

export async function getAuthenticatedPage({ page, specificPage }: Props) {
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

  const schoolCode = getLectioProps().schoolCode;

  // const timeoutPromise = new Promise<null>((resolve) => {
  //   setTimeout(() => resolve(null), 2000);
  // });
  const targetPageContentPromise = fetchCookie(
    `${baseUrl}/${schoolCode}/${targetPage}`,
    {
      method: "GET",
      headers: {
        Cookie: getLastAuthenticatedCookie(),
      },
      ...standardFetchOptions,
    },
  )
    .then(async (res) => {
      try {
        const text = await res.text();

        if (res.url.includes("login.apsx")) {
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
      } catch (err) {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });

  // const targetPageContent = await Promise.race([
  //   timeoutPromise,
  //   targetPageContentPromise,
  // ]);
  const targetPageContent = await targetPageContentPromise;

  return targetPageContent;
}
