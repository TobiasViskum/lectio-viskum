import { DateNavigationPc } from "./DateNavigation/pc";
import { DateNavigationTouch } from "./DateNavigation/touch";
import { lectioAPI } from "@/lib/lectio-api";
import { Student } from "@/components/global/Student";
import { getPageState } from "../page-state";

type Props = {
  userId: string;
  searchParamsObj: { week: string; year: string };
};
export async function ScheduleHeader({ userId, searchParamsObj }: Props) {
  const pageState = getPageState();

  const student = await lectioAPI.getStudent.byId({
    userId: userId,
  });
  let schedule = await pageState.schedule;

  if (student === null) return <p>Error</p>;
  if (schedule === null) schedule = await pageState.cachedSchedule;
  if (schedule === null) return <p>Error</p>;

  return (
    <div className="flex flex-col gap-x-4">
      {/* <div className="py-2">
        <Student student={student} disableHover />
      </div> */}
      <div className="hidden 2xl:block">
        <DateNavigationPc searchParamsObj={searchParamsObj} />
      </div>
      <div className="block 2xl:hidden">
        <DateNavigationTouch />
      </div>
    </div>
  );
}
