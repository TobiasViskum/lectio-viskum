import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";
import { getDate } from "../../../_util/getDate";
import { DocumentButton } from "@/components/global/DocumentButton";
import { cn } from "@/lib/utils";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";

type Props = { submit: Submit; isSubmitterTeacher: boolean };

export function SmallScreenSubmit({ submit, isSubmitterTeacher }: Props) {
  const date = getDate(submit.time);
  const formattedDate = new Intl.DateTimeFormat("da-dk", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);

  return (
    <Fragment>
      <div className="relative grid w-full max-w-xl rounded-md border text-sm">
        <div className="flex items-center rounded-t-sm bg-accent px-2 py-1 text-end ">
          <p className="font-semibold">{formattedDate}</p>
        </div>
        <Separator
          className="absolute bottom-0 left-[98px] h-[calc(100%-28px)]"
          orientation="vertical"
        />
        <div className="flex flex-col gap-y-1 py-1">
          <div className="grid grid-cols-[100px_1fr] px-2">
            <p className="font-semibold">Bruger</p>
            <div className={cn("flex items-center gap-x-2")}>
              {submit.submitter}
              {isSubmitterTeacher && (
                <DrawingPinFilledIcon className="text-red-400" />
              )}
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-[100px_1fr] px-2">
            <p className="font-semibold">Kommentar</p>
            <p>{submit.comment}</p>
          </div>
          <Separator />
          <div className="grid grid-cols-[100px_1fr] px-2">
            <p className="font-semibold">Dokument</p>
            <DocumentButton strDocument={JSON.stringify(submit.document)} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
