import { profileLoading } from "@/assets";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import Image from "next/image";
import { DateNavigationPc } from "./DateNavigation/pc";
import { DateNavigationTouch } from "./DateNavigation/touch";
import { CalendarBack } from "@/components/icons/CalendarBack";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";

export function ScheduleHeaderSkeleton() {
  const lectioProps = getLectioProps();
  const foundStudentObj = global.longTermCache.get(
    `${lectioProps.userId}-user`,
  );
  let name = "";
  let studentClass = "";
  let userSrc = null;
  if (foundStudentObj) {
    const student = foundStudentObj.data as Student;
    name = student.name;
    studentClass = student.studentClass;
    userSrc = student.imgSrc;
  }

  return (
    <>
      <div className="flex flex-col gap-x-4 pb-4 ">
        <div className="flex items-center gap-x-2 py-4">
          <Image
            src={userSrc || profileLoading}
            width={56}
            height={56}
            alt="img"
            className="obj aspect-square rounded-full object-cover"
          />
          <div>
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-sm text-muted-foreground">
              Klasse: {studentClass}
            </div>
          </div>
        </div>
        <div className="hidden 2xl:block">
          <div className="flex items-center gap-x-2 xl:flex">
            <button disabled>
              <CalendarBack fillTw="fill-accent" />
            </button>
            <div className="flex h-2/3 w-72 items-center justify-between rounded-md border bg-background">
              <div className="pr-6">
                <ChevronLeft className="h-6 w-6 text-muted-foreground" />
              </div>

              <DatePicker>
                <div className="text-xs">date</div>
              </DatePicker>
              <div className="pl-6">
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
        <div className="block 2xl:hidden">
          <div className="flex w-full justify-between">
            <Button
              disabled
              variant={"outline"}
              className="h-12 w-12 px-1 py-1"
            >
              <ArrowLeft className="text-white" />
            </Button>

            <Button
              disabled
              variant={"outline"}
              className="h-12 w-12 px-1 py-1"
            >
              <ArrowRight className="text-white" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
