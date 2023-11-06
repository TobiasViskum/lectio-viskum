import { Student } from "@/components/global/Student";
import { CacheRefresher } from "./_components/CacheRefresher";
import { lectioAPI } from "@/lib/lectio-api";
import { getLectioProps } from "@/lib/auth/getLectioProps";

export default async function Homepage() {
  const { lectioCookies, schoolCode, userId } = getLectioProps();
  const studentPromise = lectioAPI.getStudent.byId({
    lectioCookies: lectioCookies,
    schoolCode: schoolCode,
    userId: userId,
  });

  const [student] = await Promise.all([studentPromise]);

  if (student === null) return <p>Error</p>;

  return (
    <div className="w-full">
      <div>
        <Student student={student} size="large" />
      </div>
      <CacheRefresher />
    </div>
  );
}
