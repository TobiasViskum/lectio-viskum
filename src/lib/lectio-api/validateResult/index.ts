import { redirect } from "next/navigation";
import { ReturnType } from "../types/types";

export function validateResult(result: ReturnType<any>) {
  if (result.status === "error") {
    return redirect("?revalidateCookies=true");
  } else {
    return;
  }
}
