import { lectioAPI } from "@/lib/lectio-api";

type Props = {
  searchParamsObj: { week: string; year: string };
  userId: string;
};

export function FetchAdjacentWeeks({ searchParamsObj, userId }: Props) {
  lectioAPI.getSchedule.byStudentId({
    userId: userId,
    week: (Number(searchParamsObj.week) - 1).toString(),
    year: searchParamsObj.year,
  });
  lectioAPI.getSchedule.byStudentId({
    userId: userId,
    week: (Number(searchParamsObj.week) + 1).toString(),
    year: searchParamsObj.year,
  });
  return null;
}
