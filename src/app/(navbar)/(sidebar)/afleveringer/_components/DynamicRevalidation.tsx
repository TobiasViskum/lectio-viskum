"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { dynamicRevalidation } from "../_actions/dynamicRevalidation";

export function DynamicRevalidation() {
  const router = useRouter();

  useEffect(() => {
    async function doRevalidation() {
      await dynamicRevalidation();
      router.refresh();
    }
    doRevalidation();
  }, [router]);

  return null;
}
