"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function CacheResetter() {
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [path, router]);

  return null;
}
