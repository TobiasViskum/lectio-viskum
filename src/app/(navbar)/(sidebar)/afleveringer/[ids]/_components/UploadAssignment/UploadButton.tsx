"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  assignmentId: string;
};

export function UploadButton({ assignmentId }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  async function doPostAssignment() {
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
  }

  return (
    <div className="flex flex-col gap-y-2 pb-4 md:hidden">
      <p className="font-medium">Upload besvarelse:</p>
      <div className="flex gap-x-2">
        <Button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.click();
            }
          }}
          variant={"ghost"}
          className="flex h-auto w-44 gap-x-2 overflow-x-hidden text-ellipsis whitespace-nowrap border px-2 py-2 text-xs"
        >
          {file?.name || (
            <>
              Vælg fil <Upload className="h-3 w-3" />
            </>
          )}
        </Button>
        <input
          ref={inputRef}
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            } else {
              setFile(null);
            }
          }}
          className="hidden"
        />
        <Button
          onClick={() => setFile(null)}
          className="aspect-square h-8 w-8 p-0 text-xs"
          variant={"destructive"}
          disabled={file === null}
        >
          <X />
        </Button>
      </div>
      <Button
        onClick={doPostAssignment}
        className="h-8 w-20 text-xs"
        disabled={file === null}
      >
        Upload
      </Button>
    </div>
  );
}
