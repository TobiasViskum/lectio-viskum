import "server-only";
import { getTimeInMs } from "@/util/getTimeInMs";
import { getAuthenticatedPage } from "../getPage/getAuthenticatedPage";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAllTeachersTag, getUserTag } from "@/api-functions/getTags";
import { getLastAuthenticatedCookie } from "../getLastAuthenticatedCookie";
import { standardFetchOptions } from "../standardFetchOptions";

export async function getAllTeachers() {
  const schoolCode = getLectioProps().schoolCode;

  const client = await getRedisClient();
  const tag = getAllTeachersTag(schoolCode);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<Teacher[]>;

    if (foundCache && new Date().getTime() < foundCache.expires) {
      await client.quit();

      return foundCache.data;
    }
  }

  const res = await getAuthenticatedPage({
    page: "teachers",
  });

  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  if (res === null) return res;

  const $ = res.$;
  const fetchCookie = res.fetchCookie;

  const $spans = $("span.classpicture");

  let teachers: Teacher[] = [];
  let promises: Promise<string | null>[] = [];

  for (let i = 0; i < $spans.length; i++) {
    let obj: Teacher = {
      name: "",
      initials: "",
      teacherId: "",
      imgUrl: "",
      imgSrc: "",
    };

    const _span = $spans[i];
    const $_span = $(_span);
    const $span = $_span.find("> span > span");
    const name = $span.text();
    const teacherId = $span.attr("data-lectiocontextcard");

    if (name && teacherId) {
      obj.name = name.split(" (")[0];
      obj.initials = name.split(" (")[1].replace(")", "");
      obj.teacherId = teacherId.replace("T", "");
    }
    const src = $_span.find("img").attr("src");

    if (src) {
      const fullSrc = ["https://lectio.dk", src].join("");
      obj.imgUrl = fullSrc;
    }
    teachers.push(obj);

    const imageBase64 = fetchCookie(obj.imgUrl, {
      method: "GET",
      headers: { Cookie: getLastAuthenticatedCookie() },
      ...standardFetchOptions,
    })
      .then(async (res) => {
        try {
          const arrayBuffer = await res.arrayBuffer();
          const contentType = res.headers.get("content-type");
          const base64 = Buffer.from(arrayBuffer).toString("base64");
          const fullSrc = `data:${contentType};base64,${base64}`;
          return fullSrc;
        } catch {
          return null;
        }
      })
      .catch((err) => {
        return null;
      });
    promises.push(imageBase64);
  }
  const imageBase64Strings = await Promise.all(promises);

  for (let i = 0; i < teachers.length; i++) {
    teachers[i].imgSrc = imageBase64Strings[i] || "";
  }

  if (teachers.length === 0) {
    if (client) await client.quit();
    return "No data";
  }

  if (client) {
    await client.json.set(tag, "$", {
      data: teachers,
      expires: new Date().getTime() + getTimeInMs({ days: 1 }),
    });
    await client.quit();
  }

  return teachers;
}
