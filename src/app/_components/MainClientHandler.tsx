"use client";

import { debounce } from "@/util";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function MainClientHandler() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedFunction = useRef(
    debounce(() => {
      if (!path.includes("log-ind")) {
        fetch("/api/get-lectio-status")
          .then(async (res) => {
            const json = (await res.json()) as {
              status: "success" | "error";
              message: string;
            };
            if (json.status === "error") {
              if (json.message.includes("Forbidden")) {
                toast.error("For mange requests til Lectio", {
                  description:
                    "Der er blevet sendt for mange requests til Lectio. Prøv igen om lidt.",
                });
              } else if (json.message.includes("Invalid")) {
                toast.error("Kunne ikke logge dig ind");
                router.push("/log-ind");
              } else if (json.message.includes("down")) {
                toast.error("Lectio er nede", {
                  description:
                    "Da Lectio er nede, kunne dataen på siden ikke opdateres.",
                });
              }
            } else {
              router.refresh();
            }
          })
          .catch(() => undefined);
      }

      const isRedirected = searchParams.get("redirected");
      if (isRedirected && isRedirected === "true") {
        toast.error("Du skal logge ind før du kan bruge Lectio");
        router.replace(path);
      }
    }, 200),
  );

  useEffect(() => {
    debouncedFunction.current();
  }, [path, searchParams, router]);

  return null;
}
