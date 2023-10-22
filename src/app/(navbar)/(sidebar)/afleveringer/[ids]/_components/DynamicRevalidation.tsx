"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { dynamicRevalidation } from "../_actions/dynamicRevalidation";

type Props = { ids: string };

export function DynamicRevalidation({ ids }: Props) {
  const router = useRouter();

  useEffect(() => {
    async function doRevalidation() {
      const studentId = ids.split("-")[0];
      const assignmentId = ids.split("-")[1];
      const href = `ElevAflevering.aspx?elevid=${studentId}&exerciseid=${assignmentId}`;
      await dynamicRevalidation(assignmentId, href);
      router.refresh();
    }
    doRevalidation();
  }, [router, ids]);

  return null;
}
