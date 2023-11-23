"use client";

import { debounce } from "@/util";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

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
                if (!window.location.href.includes("notFound=true")) {
                  // router.refresh();
                }
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
    const target = e.target as HTMLButtonElement | null;

    const href = target?.getAttribute("data-lectio-href");
    if (target && target.tagName.toLowerCase() === "button" && href) {
      const name = target.textContent;

      if (href.includes("/lectio/")) {
        e.preventDefault();
        const promise = fetch(
          `/api/get-lectio-file?href=${encodeURIComponent(href)}`,
        )
          .then(async (r) => {
            const json = (await r.json()) as RegularAPIResponse<string>;

            if (json.status === "success" && name) {
              const byteCharacters = atob(json.data);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray]);

              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.target = "_blank";
              link.download = name;
              link.click();
            }
            throw new Error("Error");
          })
          .catch((e) => new Error(e));

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
