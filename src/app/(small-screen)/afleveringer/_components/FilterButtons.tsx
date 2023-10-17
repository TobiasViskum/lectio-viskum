import { cn } from "@/lib/utils";
import Link from "next/link";
import { AssignmentPageProps } from "../page";
import { z } from "zod";
import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";

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

  return (
    <>
      <div className="relative grid grid-cols-4 text-center w-96">
        <Link href="?view=alle" className={cn("transition-colors", view === "alle" ? "text-blue-500" : "text-muted-foreground")}>
          Alle
        </Link>
        <Link href="?view=afleveret" className={cn("transition-colors", view === "afleveret" ? "text-green-500" : "text-muted-foreground")}>
          Afleveret
        </Link>
        <Link href="?view=venter" className={cn("transition-colors", view === "venter" ? "text-yellow-500" : "text-muted-foreground")}>
          Venter
        </Link>
        <Link href="?view=mangler" className={cn("transition-colors", view === "mangler" ? "text-red-500" : "text-muted-foreground")}>
          Mangler
        </Link>
        <div className={cn("absolute -bottom-1 h-0.5 rounded-md w-24 transition-all", translateXMap[view])} />
      </div>
    </>
  );
}
