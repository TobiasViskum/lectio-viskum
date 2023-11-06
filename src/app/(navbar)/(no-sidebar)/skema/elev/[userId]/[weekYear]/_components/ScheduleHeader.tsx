import { profile } from "@/assets";
import Image from "next/image";
import { DateNavigationPc } from "./DateNavigation/pc";
import { DateNavigationTouch } from "./DateNavigation/touch";
import { lectioAPI } from "@/lib/lectio-api";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { Student } from "@/components/global/Student";

type Props = {
  schedulePromise: Promise<Week[] | null>;
  userId: string;
  searchParamsObj: { week: string; year: string };
};
export async function ScheduleHeader({ userId, searchParamsObj }: Props) {
  const lectioProps = getLectioProps();
  const student = await lectioAPI.getStudent.byId({
    lectioCookies: lectioProps.lectioCookies,
    schoolCode: lectioProps.schoolCode,
    userId: userId,
  });

  if (student === null) return <p>Error</p>;

  return (
    <div className="flex flex-col gap-x-4 pb-4 ">
      <Student student={student} />
      <div className="hidden 2xl:block">
        <DateNavigationPc searchParamsObj={searchParamsObj} />
      </div>
      <div className="block 2xl:hidden">
        <DateNavigationTouch />
      </div>
    </div>
  );
}
