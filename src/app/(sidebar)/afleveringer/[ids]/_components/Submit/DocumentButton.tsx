"use client";

import { downloadAsset } from "@/lib/downloadAsset";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

type Props = { strDocument: string };
export function DocumentButton({ strDocument }: Props) {
  const document: LectioDocument = JSON.parse(strDocument);
  const [isDownloading, setIsDownloading] = useState(false);

  async function downloadAssetWithCheck() {
    const result = await downloadAsset(document.href, document.name);
    if (result === null) {
      throw new Error("Download failed");
    }
    return result;
  }

  async function handleClick() {
    setIsDownloading(true);
    const promise = downloadAssetWithCheck();

    toast.promise(promise, {
      loading: "Forbereder download...",
      success: (res) => {
        setIsDownloading(false);
        return "Download startet!";
      },
      error: "Der skete en fejl",
    });
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-max text-left text-blue-400",
        isDownloading ? "animate-pulse" : "",
      )}
    >
      {document.name}
    </button>
  );
}
