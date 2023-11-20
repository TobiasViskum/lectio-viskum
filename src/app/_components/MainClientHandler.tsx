"use client";

import { downloadAsset } from "@/lib/downloadAsset";
import { debounce } from "@/util";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

function deleteCookie(name: string) {
  // document.cookie = name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  // console.log("delete:", name);
}

export function MainClientHandler() {
  const path = usePathname();
  const router = useRouter();

  const debouncedFunction = useRef(
    debounce(() => {
      if (path.includes("/log-ind") === false) {
        fetch("/api/get-lectio-status")
          .then(async (res) => {
            const json = (await res.json()) as {
              status: "success" | "error";
              message: string;
            };
            if (path.includes("/log-ind") === false) {
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
            }
          })
          .catch(() => undefined);
      }

      if (window.location.search.includes("redirected=true")) {
        toast.error("Du skal logge ind før du kan bruge Lectio");
        router.push("/log-ind?");
      }
    }, 200),
  );

  useEffect(() => {
    debouncedFunction.current();
  }, [path, router]);

  async function handleClick(e: MouseEvent) {
    const target = e.target as HTMLAnchorElement | null;

    if (target && target.tagName.toLowerCase() === "a") {
      const href = target.href;
      const name = target.text;

      if (href.includes("/lectio/")) {
        function toHtmlClass(str: string) {
          str = str.replace(/http[s]?:\/\//, "");
          str = str.replace(/\W/g, "_");
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
          finally: () => {
            console.log(document.cookie);

            // deleteCookie("ASP.NET_SessionId");
            // deleteCookie("BaseSchoolUrl");
            // deleteCookie("isloggedin3");
            // deleteCookie("autologinkey");
            // deleteCookie("LastAuthenticatedPageLoad");
            // deleteCookie("lectiogsc");
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
