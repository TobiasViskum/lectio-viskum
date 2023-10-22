"use server";

import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { revalidateTag } from "next/cache";

export async function dynamicRevalidation(assignmentId: string, href: string) {
  const lectioProps = getLectioProps();
  const tag = `assignment-${assignmentId}-${lectioProps.username}`;
  revalidateTag(tag);
  await lectioAPI.getAssignment.byHref({
    ...lectioProps,
    href: href,
    tag: tag,
  });

  return;
}
