import { getTimeInMs } from "@/util/getTimeInMs";
import { getAuthenticatedPage } from "../getPage";
import { standardFetchOptions } from "../standardFetchOptions";
import { getLastAuthenticatedCookie } from "../getLastAuthenticatedCookie";
import { getRedisClient } from "@/lib/get-redis-client";
import { getUserTag } from "@/lib/lectio-api/getTags";

type Props = {
  teacherId: string;
};

export async function getTeacherById({ teacherId }: Props) {
  const client = await getRedisClient();
  const tag = getUserTag(teacherId);
  const foundCache = (await client.json.get(tag)) as RedisCache<Teacher>;

  if (foundCache && new Date().getTime() < foundCache.expires) {
    await client.quit();
    return foundCache.data;
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

  const teachers: Teacher[] = $("span.classpicture")
    .map((index, elem) => {
      let obj = {
        name: "",
        initials: "",
        teacherId: "",
        imgUrl: "",
        imgSrc: "",
      } as Teacher;
      const $elem = $(elem);
      const $name = $elem.find("> span > span");
      const name = $name.text();
      const teacherId = $name.attr("data-lectiocontextcard");
      if (name && teacherId) {
        obj.name = name.split(" (")[0];
        obj.initials = name.split(" (")[1].replace(")", "");
        obj.teacherId = teacherId.replace("T", "");
      }
      const src = $elem.find("img").attr("src");
      if (src) {
        const fullSrc = ["https://lectio.dk", src].join("");
        obj.imgUrl = fullSrc;
      }

      return obj;
    })
    .get();

  if (teachers.length === 0) {
    return "No data";
  }

  const foundTeacher = teachers.find((teacher) => {
    return teacher.teacherId === teacherId;
  });

  if (foundTeacher === undefined) {
    return "No data";
  }

  const imageBase64 = await fetchCookie(foundTeacher.imgUrl, {
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

  if (imageBase64) {
    foundTeacher.imgSrc = imageBase64;
    await client.json.set(tag, "$", {
      data: foundTeacher,
      expires: new Date().getTime() + getTimeInMs({ days: 1 }),
    });
  }

  await client.quit();

  return foundTeacher;
}
