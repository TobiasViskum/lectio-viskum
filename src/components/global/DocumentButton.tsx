"use client";

import { downloadAsset } from "@/lib/downloadAsset";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

type Props = { strDocument: string; className?: string };
export function DocumentButton({ strDocument, className }: Props) {
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
      loading: "Henter fra Lectio...",
      success: (res) => {
        setIsDownloading(false);
        return "Download startet!";
      },
      error: (res) => {
        setIsDownloading(false);
        return "Der skete en fejl";
      },
    });
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "break-keep text-left text-blue-400 hover:underline",
        isDownloading ? "animate-pulse" : "",
        className,
      )}
    >
      {document.name}
    </button>
  );
}
