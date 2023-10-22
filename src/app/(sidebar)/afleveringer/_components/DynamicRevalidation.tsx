"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { dynamicRevalidation } from "../_actions/dynamicRevalidation";

export function DynamicRevalidation() {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function doRevalidation() {
      await dynamicRevalidation();
      router.refresh();
    }
    doRevalidation();
  }, [path, router]);

  return null;
}
