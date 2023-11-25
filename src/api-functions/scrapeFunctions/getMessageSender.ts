import { getAuthenticatedPage } from "../getPage";
import { getStudentById } from ".";
import { getRedisClient } from "@/lib/get-redis-client";
import { getUserTag } from "../getTags";

export async function getMessageSender(name: string) {
  name = name.split(" (")[0];

  const client = await getRedisClient();

  if (client) {
    const foundUserId = await client.hGet("usernames", name);
    if (foundUserId) {
      const tag = getUserTag(foundUserId);

      const foundUser = (await client.json.get(tag)) as RedisCache<
        Student | Teacher
      >;
      if (foundUser) {
        await client.quit();
        return foundUser.data;
      }
    }
    await client.quit();
  }

  let foundSender = {} as Student | Teacher;
  const firstLetter = name.charAt(0);

  const res = await getAuthenticatedPage({
    specificPage: `FindSkema.aspx?type=elev&forbogstav=${firstLetter}`,
  });

  if (res === null) return null;
  if (res === "Not authenticated") return null;
  if (res === "Forbidden access") return null;
  if (res === "Invalid school") return null;

  const $ = res.$;

  const $as = $("#m_Content_listecontainer > ul > li > a");

  for (let i = 0; i < $as.length; i++) {
    const a = $as[i];
    const $a = $(a);
    const text = $a.text().trim();

    let id = ($a.attr("data-lectiocontextcard") || "").replace(/[a-z]+/gi, "");

    if (text.includes(name) && id) {
      const newSender = await getStudentById({ userId: id });
      if (newSender !== null && typeof newSender !== "string") {
        foundSender = newSender;
        break;
      }
    }
  }

  if (foundSender) return foundSender;
  return null;
}
