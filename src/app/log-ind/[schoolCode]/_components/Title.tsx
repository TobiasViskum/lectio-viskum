"use client";

import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { H1 } from "@/components/ui/h1";
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
      <div className="flex h-9 items-center text-4xl sm:h-10">
        <LoadingDots />
      </div>
    </>
  );
}

export function Title({ schoolPromise, name }: Props) {
  const [schoolName, setSchoolName] = useState(name || null);
  const router = useRouter();

  useEffect(() => {
    async function verifySchool() {
      const school = await schoolPromise;

      if (school === null) {
        console.log("falsely redirected");

        router.push("/log-ind");
      } else if (school.name !== name) {
        setSchoolName(school.name);
      }
    }
    verifySchool();
  }, [schoolPromise, router, name]);

  return (
    <>
      {schoolName === null ? (
        <TitleSkeleton />
      ) : (
        <H1 className="text-center">{schoolName}</H1>
      )}
    </>
  );
}
