import { Student } from "@/components/global/Student";
import { CacheRefresher } from "./_components/CacheRefresher";
import { lectioAPI } from "@/lib/lectio-api";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getRedisClient } from "@/lib/get-redis-client";
import { getAssignmentTag } from "@/lib/lectio-api/getTags";

export default async function Homepage() {
  const { userId } = getLectioProps();
  const studentPromise = lectioAPI.getStudent.byId({
    userId: userId,
  });

  const [student] = await Promise.all([studentPromise]);

  if (student === null) return <p>Error</p>;

  const client = await getRedisClient();
  const tag = getAssignmentTag(userId, "61338932032");
  const foundCache = await client.json.get(tag);
  console.log(foundCache);
  await client.quit();

  return (
    <div className="w-full">
      <div>
        <Student student={student} size="large" disableHover />
      </div>
      <CacheRefresher />
    </div>
  );
}
