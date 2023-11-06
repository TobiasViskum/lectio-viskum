import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getWeekAndYear } from "@/util/getWeekAndYear";
import { redirect } from "next/navigation";

export default function SchedulePage() {
  const { week, year } = getWeekAndYear(new Date());
  const { userId } = getLectioProps();
  redirect(`/skema/elev/${userId}/${week}-${year}`);
}
