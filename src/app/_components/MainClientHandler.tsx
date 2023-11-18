"use client";

import { downloadAsset } from "@/lib/downloadAsset";
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

  async function handleClick(e: MouseEvent) {
    const target = e.target as HTMLAnchorElement | null;

    if (target && target.tagName.toLowerCase() === "a") {
      const href = target.href;
      const name = target.text;

      if (href.includes("/lectio/")) {
        e.preventDefault();
        async function downloadAssetWithCheck() {
          const result = await downloadAsset(href, name);
          console.log(result);

          if (result === null) {
            throw new Error("Download failed");
          }
          return result;
        }
        const promise = downloadAssetWithCheck();

        toast.promise(promise, {
          loading: "Henter fra Lectio...",
          success: (res) => {
            return "Download startet!";
          },
          error: (res) => {
            return "Der skete en fejl";
          },
        });
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
