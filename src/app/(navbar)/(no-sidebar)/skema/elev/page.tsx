import { getLectioProps } from "@/lib/auth/getLectioProps";
import { redirect } from "next/navigation";

export default function ScheduleStudentRedirect() {
  const lectioProps = getLectioProps();
  redirect(`/skema/elev/${lectioProps.userId}`);
}
