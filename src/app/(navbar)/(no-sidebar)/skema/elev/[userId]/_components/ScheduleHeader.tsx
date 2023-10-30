import { profile } from "@/assets";
import Image from "next/image";
import { DateNavigationPc } from "./DateNavigation/pc";
import { DateNavigationTouch } from "./DateNavigation/touch";
import { lectioAPI } from "@/lib/lectio-api";
import { getLectioProps } from "@/lib/auth/getLectioProps";

type Props = {
  schedulePromise: Promise<Week[] | null>;
  userId: string;
  searchParamsObj: { week: string; year: string };
};
export async function ScheduleHeader({
  schedulePromise,
  userId,
  searchParamsObj,
}: Props) {
  const lectioProps = getLectioProps();
  const studentPromise = lectioAPI.getStudent.byId({
    lectioCookies: lectioProps.lectioCookies,
    schoolCode: lectioProps.schoolCode,
    userId: userId,
  });

  const [schedule, student] = await Promise.all([
    schedulePromise,
    studentPromise,
  ]);

  return (
    <div className="flex flex-col gap-x-4 pb-4 ">
      <div className="flex items-center gap-x-2 py-4">
        <Image
          src={student?.imgSrc || profile}
          width={56}
          height={56}
          alt="img"
          className="obj aspect-square rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">{student?.name}</p>
          <p className="text-sm text-muted-foreground">
            Klasse: {student?.studentClass}
          </p>
        </div>
      </div>
      <div className="hidden 2xl:block">
        <DateNavigationPc searchParamsObj={searchParamsObj} />
      </div>
      <div className="block 2xl:hidden">
        <DateNavigationTouch />
      </div>
    </div>
  );
}
