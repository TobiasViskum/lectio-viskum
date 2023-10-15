"use client";

import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  schoolPromise: Promise<School | null>;
  name?: string;
};

function TitleSkeleton() {
  return (
    <>
      <div className="sm:h-10 h-9 text-4xl flex items-center">
        <LoadingDots />
      </div>
    </>
  );
}

export function Title({ schoolPromise, name }: Props) {
  const [schoolName, setSchoolName] = useState(name || null);
  const router = useRouter();

  const titleTw = "sm:text-4xl text-3xl leading-snug font-semibold flex flex-col [text-wrap:balance] text-center";

  useEffect(() => {
    async function verifySchool() {
      const school = await schoolPromise;
      if (school === null) {
        router.push("/log-ind");
      } else if (school.name !== name) {
        setSchoolName(school.name);
      }
    }
    verifySchool();
  }, [schoolPromise, router, name]);

  return <>{schoolName === null ? <TitleSkeleton /> : <h1 className={titleTw}>{schoolName}</h1>}</>;
}
