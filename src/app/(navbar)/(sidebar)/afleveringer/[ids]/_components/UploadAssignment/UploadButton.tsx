"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  assignmentId: string;
  inSidebar?: boolean;
};

export function UploadButton({ assignmentId, inSidebar = false }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function doPostAssignment() {
    setIsUploading(true);
    const formData = new FormData();
    if (file !== null) {
      formData.append("fileData", file);
      formData.append("assignmentId", assignmentId);
      const promise = fetch("/api/post-assignment", {
        method: "POST",
        body: formData,
      }).then(async (r) => {
        const json = (await r.json()) as NoDataAPIResponse;
        if (json.status === "success") {
          return true;
        }
        throw new Error("Error");
      });

      toast.promise(promise, {
        loading: "Uploader...",
        success: async (res) => {
          router.refresh();
          return "Uploadede aflevering";
        },
        error: (res) => {
          return "Der skete en fejl";
        },
      });
    } else {
      toast.error("Der er ikke valgt nogen fil");
    }
    setFile(null);
    setIsUploading(false);
  }

  return (
    <div
      className={cn("flex flex-col gap-y-2 pb-4", inSidebar ? "" : "md:hidden")}
    >
      {!inSidebar && <p className={cn("font-medium")}>Upload besvarelse:</p>}
      <div className="relative flex items-center gap-x-2 rounded-md border transition-colors [&:hover:not(:has(#close:hover))]:bg-accent">
        <button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.click();
            }
          }}
          className="flex h-8 w-full items-center gap-x-2 pl-2 text-left text-xs"
        >
          {(file !== null && (
            <p className="w-[calc(100%-32px)] overflow-hidden text-ellipsis whitespace-nowrap">
              {file?.name}
            </p>
          )) || (
            <>
              Vælg fil
              <Upload className="aspect-square h-3 min-h-[12px] w-3 min-w-[12px]" />
            </>
          )}
        </button>
        <Button
          id="close"
          variant={"ghost"}
          onClick={() => {
            setFile(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className={cn(
            "absolute right-0 aspect-square h-8 w-8 rounded-sm bg-transparent p-0 text-xs text-foreground hover:bg-red-500",
            file === null ? "hidden" : "grid place-items-center",
          )}
        >
          <X className="text-red-500 transition-colors group-hover:text-foreground" />
        </Button>
      </div>
      <Button
        loading={isUploading}
        onClick={doPostAssignment}
        className={cn(
          "flex h-8 gap-x-2 text-xs",
          inSidebar ? "w-full" : "w-20",
        )}
        disabled={file === null}
      >
        {isUploading ? "Uploader..." : "Upload"}
      </Button>
      <input
        ref={inputRef}
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          } else {
            setFile(null);
            if (inputRef.current) inputRef.current.value = "";
          }
        }}
        className="hidden"
      />
    </div>
  );
}
