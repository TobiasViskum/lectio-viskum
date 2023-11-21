"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function CacheRefresher() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return null;
}
