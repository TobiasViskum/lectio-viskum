"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { dynamicRevalidation } from "../_actions/dynamicRevalidation";

export function DynamicRevalidation() {
  const path = usePathname();

  useEffect(() => {
    dynamicRevalidation();
  }, [path]);

  return null;
}
