import { getAuthenticatedPage } from "@/api-functions/getPage";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { load } from "cheerio";
import { standardFetchOptions } from "@/api-functions/standardFetchOptions";
import { getLastAuthenticatedCookie } from "@/api-functions/getLastAuthenticatedCookie";
import { getSchoolClassForm } from "@/api-functions/getPage/getForm/get-school-class-form";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAllSchoolClassesTag } from "@/api-functions/getTags";
import { getTimeInMs } from "@/util/getTimeInMs";

export async function getAllSchoolClasses() {
  const schoolCode = getLectioProps().schoolCode;
  const client = await getRedisClient();
  const tag = getAllSchoolClassesTag(schoolCode);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<
      SchoolClass[]
    >;

    if (foundCache && new Date().getTime() < foundCache.expires) {
      await client.quit();
      return foundCache.data;
    }
  }

  let overallClassLinks: string[] = [];
  const res = await getAuthenticatedPage({
    specificPage: "default.aspx",
  });

  if (res === null || typeof res === "string") {
    if (client) await client.quit();
    return null;
  }

  const fetchCookie = res.fetchCookie;
  const $ = res.$;
  const $as = $("#m_Content_elevertd > ul > li > a");
  for (let i = 0; i < $as.length; i++) {
    const a = $as[i];
    const $a = $(a);
    const href = $a.attr("href") || "";
    if (href.includes("type=hold")) {
      overallClassLinks.push(href);
    }
  }

  type HrefHolder = { shortSubject: string; longSubject: string; href: string };
  let allSchoolClasses: SchoolClass[] = [];
  const allClassLinks: HrefHolder[] = [];
  let promises: Promise<boolean>[] = [];

  for (let i = 0; i < overallClassLinks.length; i++) {
    const promise = new Promise<boolean>(async (resolve) => {
      const url = `https://www.lectio.dk${overallClassLinks[i]}`;
      const $2 = await fetchCookie(url, {
        headers: { Cookie: getLastAuthenticatedCookie() },
        ...standardFetchOptions,
      })
        .then(async (r) => {
          const text = await r.text();

          if (text.includes('id="m_Content_listecontainer"')) {
            return load(text);
          }

          return null;
        })
        .catch(() => null);

      if ($2 === null) return resolve(false);

      const $as = $2("div#m_Content_listecontainer > ul > li > a");

      for (let i = 0; i < $as.length; i++) {
        const a = $as[i];
        const $a = $2(a);
        let href = $a.attr("href");
        const schoolClassIdMatch = href?.match(/holdelementid=([0-9]+)/);
        if (href && schoolClassIdMatch) {
          const schoolClassId = schoolClassIdMatch[1];
          const fullClass = $a.text();
          allSchoolClasses.push({
            class: "",
            classId: schoolClassId,
            fullClass: fullClass,
            subject: "",
          });
        } else if (href && href.includes("fag=")) {
          const shortSubject = $a.find("span").text().trim();
          const longSubject = $a.text().replace(shortSubject, "").trim();

          allClassLinks.push({
            href: href,
            longSubject: longSubject,
            shortSubject: shortSubject,
          });
        }
      }
      resolve(true);
    });
    promises.push(promise);
  }
  await Promise.all(promises);

  for (let i = 0; i < allClassLinks.length; i++) {
    if (i % 10 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    const classLink = allClassLinks[i];
    const longSubject = classLink.longSubject;
    const shortSubject = classLink.shortSubject;
    const url = `https://www.lectio.dk${classLink.href}`;

    const $2 = await fetchCookie(url, {
      method: "GET",
      headers: { Cookie: getLastAuthenticatedCookie() },
      ...standardFetchOptions,
    })
      .then(async (r) => {
        const text = await r.text();

        if (text.includes("aktuelle")) {
          return load(text);
        }
        return null;
      })
      .catch(() => null);

    if ($2 === null) {
      if (client) await client.quit();
      return allSchoolClasses;
    }

    const $as2 = $2("div#m_Content_listecontainer > ul > li > a");
    for (let j = 0; j < $as2.length; j++) {
      const a = $as2[j];
      const $a = $2(a);
      let href = $a.attr("href");
      const schoolClassIdMatch = href?.match(/holdelementid=([0-9]+)/);
      if (href && schoolClassIdMatch) {
        const schoolClassId = schoolClassIdMatch[1];
        const fullClass = $a.text();
        let schoolClass = fullClass.split(" ")[0];
        let subject = longSubject;

        if (
          i === allClassLinks.length - 1 ||
          shortSubject.toLowerCase() === "øh" ||
          longSubject.includes("øvrig")
        ) {
          subject = $a.text();
          const splitStr = subject.split(" ");
          for (let l = 0; l < splitStr.length; l++) {
            const str = splitStr[l];
            if (l === 0) continue;
            if (str.length === 1) continue;
            let tempSplitStr = [...splitStr];
            let count = 0;
            do {
              tempSplitStr.shift();
              count++;
            } while (count < l);
            subject = tempSplitStr.join(" ");
            break;
          }
          schoolClass = fullClass.replace(subject, "").trim();
        }

        allSchoolClasses.push({
          class: schoolClass,
          classId: schoolClassId,
          fullClass: fullClass,
          subject: subject,
        });
      }
    }
  }

  if (client) {
    await client.json.set(tag, "$", {
      data: allSchoolClasses,
      expires: new Date().getTime() + getTimeInMs({ days: 1 }),
    });
    await client.quit();
  }

  return allSchoolClasses;
}
