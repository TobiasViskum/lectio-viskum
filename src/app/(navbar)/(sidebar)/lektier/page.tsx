import { getHomework } from "@/api-functions/scrapeFunctions/getHomework";
import { getRedisClient } from "@/lib/get-redis-client";

export default async function HomeworkPage() {
  await getHomework();

  return <h1>Lektier</h1>;
}
