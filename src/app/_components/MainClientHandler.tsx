"use client";

import { debounce } from "@/util";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function MainClientHandler() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedFunction = debounce(() => {
    const isRedirected = searchParams.get("redirected");
    if (isRedirected && isRedirected === "true") {
      toast.error("Du skal logge ind før du kan bruge Lectio");
      router.replace(path);
    }
  }, 200);

  useEffect(() => {
    debouncedFunction();
  }, [path, searchParams, router, debouncedFunction]);

  return null;
}
