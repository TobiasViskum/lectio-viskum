import { Student } from "@/components/global/Student";
import { lectioAPI } from "@/lib/lectio-api";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { PrefetchInitialPages } from "./_components/Prefetcher";
import { Suspense } from "react";
import { CacheRefresher } from "./_components/CacheRefresher";
import { getFrontPageInformation } from "@/api-functions/scrapeFunctions/getFrontPageInformation";
import { cn } from "@/lib/utils";
import { H2 } from "@/components/ui/h2";

export default async function Homepage() {
  const { userId } = getLectioProps();
  const studentPromise = lectioAPI.getStudent.byId({
    userId: userId,
  });

  const frontPageInformationPromise = getFrontPageInformation();

  const [student, frontPageInformation] = await Promise.all([
    studentPromise,
    frontPageInformationPromise,
  ]);

  if (student === null) return <p>Error</p>;
  if (frontPageInformation === null || typeof frontPageInformation === "string")
    return <p>Error</p>;

  return (
    <div className="w-full">
      <div className="w-max">
        <Student student={student} size="large" disableHover />
      </div>
      <div>
        <H2 className="py-2">Aktuel information</H2>
        <div className="flex w-max max-w-md flex-col gap-y-6">
          {frontPageInformation.importantInformation.map((section) => {
            return (
              <div key={JSON.stringify(section)} className="flex w-full">
                <div className="flex w-full flex-col rounded-md px-3 py-2">
                  {section.map((str, i) => {
                    if (str.length === 1) return null;
                    return (
                      <p
                        key={str}
                        className={cn(
                          "min-h-[6px] text-muted-foreground",
                          i === 0 && "font-bold",
                        )}
                      >
                        {str}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Suspense>
        <PrefetchInitialPages />
      </Suspense>
      <CacheRefresher />
    </div>
  );
}
