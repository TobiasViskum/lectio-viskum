import axios from "axios";
import { load } from "cheerio";

type UnauthenticatedPages = "school";

const pageMap: { [key in UnauthenticatedPages]: string } = {
  school: "https://www.lectio.dk/lectio/login_list.aspx",
};

type Props = { page: UnauthenticatedPages };

export async function getBasicPage({ page }: Props) {
  const targetPage = pageMap[page];
  const targetPageContent = await fetch(targetPage, { method: "GET" })
    .then(async (res) => {
      try {
        const text = await res.text();
        if (text.includes("Der opstod en ukendt fejl")) {
          return null;
        } else {
          return load(text);
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
