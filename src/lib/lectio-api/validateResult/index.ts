import "server-only";
import { redirect } from "next/navigation";
import { ReturnType } from "../types/types";

export function validateResult(result: ReturnType<any>) {
  if (result.status === "error") {
    if (result.message.includes("too many requests")) {
      try {
        redirect("/adgang-forbudt");
      } catch {
        redirect("/adgang-forbudt");
      }
    } else if (result.message.includes("auth")) {
      try {
        redirect("/opdater-adgang");
      } catch {
        redirect("/opdater-adgang");
      }
    }
  } else {
    return;
  }
}
