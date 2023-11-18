"use client";

import { downloadAsset } from "@/lib/downloadAsset";
import { debounce } from "@/util";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
        function toHtmlClass(str: string) {
          // Remove http:// or https://
          str = str.replace(/http[s]?:\/\//, "");
          // Replace non-alphanumeric characters with underscores
          str = str.replace(/\W/g, "_");
          // Remove any leading non-letters
          str = str.replace(/^[^a-zA-Z]+/, "");
          return str;
        }

        const toastId = toHtmlClass(`toast-${href}-${name}`);
        e.preventDefault();
        async function downloadAssetWithCheck() {
          const downloader = downloadAsset(href, name);
          for await (const progress of downloader) {
            const existingToast = document.querySelector(
              `.${toastId} > div:nth-child(2) > div`,
            );
            if (existingToast) {
              existingToast.textContent = `Henter fra Lectio... (${+progress.toFixed(
                0,
              )}%)`;
            }
          }
        }
        const promise = downloadAssetWithCheck();

        toast.promise(promise, {
          loading: "Henter fra Lectio... (0%)",
          success: (res) => {
            return "Download startet!";
          },
          error: (res) => {
            return "Der skete en fejl";
          },
          className: toastId,
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
