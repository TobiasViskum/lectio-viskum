"use client";

import { handleClientAuthenticated } from "@/lib/auth/handleClientAuthenticated";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function MainClientHandler() {
  const path = usePathname();
  // const searchParams = useSearchParams();
  // const router = useRouter();

  useEffect(() => {
    // document.cookie = "username=tobi688c; expires=; path=/;";
    // document.cookie = "password=10Elefanter!; expires=; path=/;";
    // document.cookie = "schoolCode=243; expires=; path=/;";
    // handleClientAuthenticated();
    // const isRedirected = searchParams.get("redirected");
    // if (isRedirected && isRedirected === "true") {
    //   toast.error("Du skal logge ind før du kan bruge Lectio");
    //   router.replace(path);
    // }
  }, [path]);

  return null;
}
