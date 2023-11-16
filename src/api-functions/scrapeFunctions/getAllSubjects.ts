import "server-only";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getAuthenticatedPage } from "@/api-functions/getPage";
import { load } from "cheerio";
import { getTimeInMs } from "@/util/getTimeInMs";
import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAllSubjectsTag } from "../getTags";

export async function getAllSubjects() {
  const schoolCode = getLectioProps().schoolCode;
  const client = await getRedisClient();
  const tag = getAllSubjectsTag(schoolCode);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<Subject[]>;
    if (foundCache && new Date().getTime() < foundCache.expires) {
      await client.quit();
      return foundCache.data;
    }
  }

  const res = await getAuthenticatedPage({
    specificPage: "FindSkema.aspx?type=hold",
  });

  if (res === null) return null;
  if (res === "Not authenticated") return null;
  if (res === "Forbidden access") return null;
  if (res === "Invalid school") return null;

  const $_a = res.$("div#m_Content_listecontainer > ul > li > a");

  let allSubjects: Subject[] = [];

  let href = "";
  for (let i = 0; i < $_a.length; i++) {
    const a = $_a[i];
    const $a = res.$(a);
    const text = $a.text();

    const shortName = $a.find("span").text().trim();
    const fullName = text.replace(shortName, "").trim();
    if (i === $_a.length - 1 || shortName.toLowerCase() === "øh") {
      href = $a.attr("href") || "";
    } else {
      allSubjects.push({
        shortName: shortName,
        fullName: fullName,
      });
    }
  }
  if (href !== "") {
    href = ["https://lectio.dk", href].join("");
    const _$ = await res
      .fetchCookie(href, {
        headers: { Cookie: getLastAuthenticatedCookie() },
        method: "GET",
      })
      .then(async (res) => {
        const text = await res.text();
        if (text.includes("Vis Hold")) {
          return load(text);
        }

        return null;
      })
      .catch((err) => {
        return null;
      });
    if (_$) {
      const $__a = _$("div#m_Content_listecontainer > ul > li > a");
      for (let i = 0; i < $__a.length; i++) {
        const a = $__a[i];
        const $a = res.$(a);
        const text = $a.text();
        const splitStr = text.split(" ");
        let foundStr = "";
        for (let j = 0; j < splitStr.length; j++) {
          const str = splitStr[j];
          if (j === 0) continue;
          if (str.length === 1) continue;
          let tempSplitStr = [...splitStr];
          let count = 0;
          do {
            tempSplitStr.shift();
            count++;
          } while (count < j);
          foundStr = tempSplitStr.join(" ");
          break;
        }
        if (foundStr !== "") {
          if (
            allSubjects.find((obj) => obj.fullName === foundStr) === undefined
          ) {
            allSubjects.push({
              shortName: "",
              fullName: foundStr,
            });
          }
        }
      }
    }
  }

  if (client) {
    if (allSubjects.length !== 0) {
      await client.json.set(tag, "$", {
        data: allSubjects,
        expires: new Date().getTime() + getTimeInMs({ days: 1 }),
      });
    }

    await client.quit();
  }

  return allSubjects;
}
