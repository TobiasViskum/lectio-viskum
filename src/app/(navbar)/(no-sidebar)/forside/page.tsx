import { Student } from "@/components/global/Student";
import { lectioAPI } from "@/lib/lectio-api";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { PrefetchInitialPages } from "./_components/Prefetcher";
import { Suspense } from "react";
import { CacheRefresher } from "./_components/CacheRefresher";

export default async function Homepage() {
  const { userId } = getLectioProps();
  const studentPromise = lectioAPI.getStudent.byId({
    userId: userId,
  });

  const [student] = await Promise.all([studentPromise]);

  if (student === null) return <p>Error</p>;

  return (
    <div className="w-full">
      <div>
        <Student student={student} size="large" disableHover />
      </div>
      <Suspense>
        <PrefetchInitialPages />
      </Suspense>
      <CacheRefresher />
    </div>
  );
}
