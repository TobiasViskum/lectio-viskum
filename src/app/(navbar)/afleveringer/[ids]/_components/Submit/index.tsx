import { getDate } from "../../../../../../util/schedule/getDate";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

type Props = { submit: Submit };

export function Submit({ submit }: Props) {
  const date = new Date(submit.time);
  const formattedDate = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);

  const isSubmitterTeacher = "teacherId" in submit.submitter;

  return (
    <div className="flex flex-col gap-y-1 pl-2">
      <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
        <p>{formattedDate}</p>{" "}
        {isSubmitterTeacher && (
          <DrawingPinFilledIcon className="text-red-400" />
        )}
      </div>
      <div className="flex gap-x-2">
        <Image
          src={submit.submitter.imgSrc}
          alt="img"
          width={56}
          height={56}
          className="obj aspect-square h-14 w-14 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center gap-y-0.5">
          <p className="text-lg font-medium">{submit.submitter.name}</p>
          <button
            data-lectio-href={submit.document.href}
            className="break-all text-sm text-link [text-wrap:balance] hover:underline"
          >
            {submit.document.name}
          </button>
        </div>
      </div>
      {submit.comment !== "" && (
        <div className="pt-1">
          <p className="text-sm">Note:</p>
          <p className="text-sm text-muted-foreground">{submit.comment}</p>
        </div>
      )}
    </div>
  );
}
