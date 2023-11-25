import "server-only";
import { getTimeInMs } from "@/util/getTimeInMs";
import { getAuthenticatedPage } from "../getPage";
import { standardFetchOptions } from "../standardFetchOptions";
import { getLastAuthenticatedCookie } from "../getLastAuthenticatedCookie";
import { getRedisClient } from "@/lib/get-redis-client";
import { getUserTag } from "@/api-functions/getTags";

type Props = {
  userId: string;
};

export async function getStudentById({ userId }: Props) {
  const client = await getRedisClient();
  const tag = getUserTag(userId);
  if (client) {
    const foundCache = (await client.json.get(tag)) as RedisCache<Student>;

    if (foundCache && new Date().getTime() < foundCache.expires) {
      await client.quit();
      return foundCache.data;
    }
  }

  const res = await getAuthenticatedPage({
    specificPage: `DokumentOversigt.aspx?folderid=S60631246942__&elevid=${userId}`,
  });

  if (
    res === null ||
    res === "Not authenticated" ||
    res === "Forbidden access" ||
    res === "Invalid school"
  ) {
    if (client) await client.quit();
    return res;
  }

  const $ = res.$;
  const fetchCookie = res.fetchCookie;

  const imgHref = [
    "https://lectio.dk",
    $("img#s_m_HeaderContent_picctrlthumbimage").attr("src"),
    "&fullsize=1",
  ].join("");

  const imageBase64 = await fetchCookie(imgHref, {
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

  let studentId = $(
    "div#s_m_HeaderContent_MainTitle[data-lectiocontextcard]",
  ).attr("data-lectiocontextcard");
  if (studentId) {
    studentId = studentId.replace("S", "");
  }

  const nameAndClass = $("div#s_m_HeaderContent_MainTitle").text();

  let name = "";
  let studentClass = "";

  const nameMatch = nameAndClass.match(/Eleven (.*), /i);
  const classMatch = nameAndClass.match(/Eleven .*, ([a-z0-9-]+) /i);

  if (nameMatch) {
    name = nameMatch[1];
  }
  if (classMatch) {
    studentClass = classMatch[1];
  }

  const data = {
    name: name,
    studentClass: studentClass,
    studentId: studentId,
    imgUrl: imgHref,
    imgSrc: imageBase64,
  } as Student;

  if (studentId && imageBase64 && client) {
    await client.json.set(tag, "$", {
      data: data,
      expires: new Date().getTime() + getTimeInMs({ days: 1 }),
    });
    await client.hSet("usernames", name, studentId);
  }

  if (client) await client.quit();

  return data;
}
