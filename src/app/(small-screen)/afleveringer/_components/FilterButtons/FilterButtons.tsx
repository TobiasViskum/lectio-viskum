import { cn } from "@/lib/utils";
import Link from "next/link";
import { AssignmentPageProps } from "../../page";
import { z } from "zod";
import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { FilterButtonsSkeleton } from "./FilterButtonsSkeleton";

export async function FilterButtons({ searchParams }: AssignmentPageProps) {
  const credentials = getCredentials();
  const tag = `assignments-${credentials.username}`;
  const assignments = await lectioAPI.getAssignments({ ...credentials, tag: tag });

  let view: "alle" | "afleveret" | "venter" | "mangler" = "alle";
  try {
    view = z.enum(["alle", "afleveret", "venter", "mangler"]).parse(searchParams.view);
  } catch {}

  const translateXMap = {
    "alle": "translate-x-0 bg-blue-500",
    "afleveret": "translate-x-24 bg-green-500",
    "venter": "translate-x-48 bg-yellow-500",
    "mangler": "translate-x-72 bg-red-500",
  } as const;

  if (assignments === null) {
    return <FilterButtonsSkeleton />;
  }

  const totalAssignments = assignments.length;
  const submittedAssignments = assignments.filter((obj) => obj.status === "Afleveret").length;
  const pendingAssignments = assignments.filter((obj) => obj.status === "Venter").length;
  const missingAssignments = assignments.filter((obj) => obj.status === "Mangler").length;

  const linkTw = "transition-colors flex flex-col gap-y-1";

  return (
    <>
      <div className="relative grid grid-cols-4 text-center w-96 text-sm">
        <Link href="?view=alle" className={cn(linkTw, view === "alle" ? "text-blue-500" : "text-muted-foreground")}>
          <p className="text-xs">{totalAssignments}</p>
          <p>Alle</p>
        </Link>
        <Link href="?view=afleveret" className={cn(linkTw, view === "afleveret" ? "text-green-500" : "text-muted-foreground")}>
          <p className="text-xs">{submittedAssignments}</p>
          <p>Afleveret</p>
        </Link>
        <Link href="?view=venter" className={cn(linkTw, view === "venter" ? "text-yellow-500" : "text-muted-foreground")}>
          <p className="text-xs">{pendingAssignments}</p>
          <p>Venter</p>
        </Link>
        <Link href="?view=mangler" className={cn(linkTw, view === "mangler" ? "text-red-500" : "text-muted-foreground")}>
          <p className="text-xs">{missingAssignments}</p>
          <p>Mangler</p>
        </Link>
        <div className={cn("absolute -bottom-2 h-0.5 rounded-md w-24 transition-all", translateXMap[view])} />
      </div>
    </>
  );
}
