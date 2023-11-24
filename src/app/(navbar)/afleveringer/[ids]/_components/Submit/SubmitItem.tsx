import { H3 } from "@/components/ui/h3";
import { P } from "@/components/ui/p";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";
import { File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SubmitItem({
  submit,
  pinned = false,
}: {
  submit: Submit;
  pinned?: boolean;
}) {
  const formattedTime = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(submit.time));

  return (
    <div className="space-y-2">
      <P>{formattedTime}</P>
      <div className="flex items-start">
        <Image
          src={submit.submitter.imgSrc}
          alt="img"
          width={64}
          height={64}
          className="aspect-square h-16 w-16 rounded-full object-cover"
        />
        <div className="flex flex-col gap-y-1 pl-2 text-left">
          <H3 className="line-clamp-1 flex items-center gap-x-2 whitespace-nowrap">
            {submit.submitter.name}
            {pinned && <DrawingPinFilledIcon className="text-red-400" />}
          </H3>

          {submit.document.href !== "" && (
            <div className="flex w-full items-center space-x-1 overflow-hidden">
              <File className="aspect-square h-4 min-h-[16px] w-4 min-w-[16px] text-link" />
              <button
                data-lectio-href={submit.document.href}
                className="link line-clamp-1 text-sm font-medium"
              >
                {submit.document.name}
              </button>
            </div>
          )}
          {submit.document.href === "" && submit.comment !== "" && (
            <P className="break-all">{submit.comment}</P>
          )}
        </div>
      </div>
      {submit.document.href !== "" && submit.comment !== "" && (
        <P className="break-all">{submit.comment}</P>
      )}
    </div>
  );
}
