import { DateNavigationPc } from "./DateNavigation/pc";
import { DateNavigationTouch } from "./DateNavigation/touch";
import { lectioAPI } from "@/lib/lectio-api";
import { Student } from "@/components/global/Student";

type Props = {
  schedulePromise: Promise<Week[] | null>;
  userId: string;
  searchParamsObj: { week: string; year: string };
};
export async function ScheduleHeader({ userId, searchParamsObj }: Props) {
  const student = await lectioAPI.getStudent.byId({
    userId: userId,
  });

  if (student === null) return <p>Error</p>;

  return (
    <div className="flex flex-col gap-x-4 pb-4 ">
      <div className="py-2">
        <Student student={student} disableHover />
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
