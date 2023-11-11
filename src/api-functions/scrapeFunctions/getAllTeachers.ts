import "server-only";
import { getTimeInMs } from "@/util/getTimeInMs";
import { getAuthenticatedPage } from "../getPage/getAuthenticatedPage";
import { getLectioProps } from "@/lib/auth/getLectioProps";

export async function getAllTeachers() {
  const schoolCode = getLectioProps().schoolCode;
  const tag = `${schoolCode}-teachers`;
  const foundCache = global.cache.get(tag);

  if (foundCache && new Date().getTime() < foundCache.expires) {
    return foundCache.data as Teacher[];
  }

  const res = await getAuthenticatedPage({
    page: "teachers",
  });

  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  if (res === null) return res;

  const $ = res.$;

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

  global.cache.set(tag, {
    data: teachers,
    expires: new Date().getTime() + getTimeInMs({ days: 1 }),
  });

  return teachers;
}
