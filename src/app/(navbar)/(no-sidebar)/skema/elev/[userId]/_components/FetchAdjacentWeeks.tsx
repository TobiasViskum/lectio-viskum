import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";

type Props = { searchParamsObj: { week: string; year: string } };

export function FetchAdjacentWeeks({ searchParamsObj }: Props) {
  const lectioProps = getLectioProps();
  lectioAPI.getSchedule.byCredentials({
    ...lectioProps,
    week: (Number(searchParamsObj.week) - 1).toString(),
    year: searchParamsObj.year,
  });
  lectioAPI.getSchedule.byCredentials({
    ...lectioProps,
    week: (Number(searchParamsObj.week) + 1).toString(),
    year: searchParamsObj.year,
  });
  return null;
}
