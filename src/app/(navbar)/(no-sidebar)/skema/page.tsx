import { getLectioProps } from "@/lib/auth/getLectioProps";
import { redirect } from "next/navigation";

export default function ScheduleRedirect() {
  const lectioProps = getLectioProps();
  redirect(`/skema/elev/${lectioProps.userId}`);
}
