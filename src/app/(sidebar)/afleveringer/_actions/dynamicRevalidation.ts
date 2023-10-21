"use server";

import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { revalidateTag } from "next/cache";

export async function dynamicRevalidation() {
  const lectioProps = getLectioProps();
  const tag = `assignments-${lectioProps.username}`;
  revalidateTag(tag);
  await lectioAPI.getAssignment.all({ ...lectioProps, tag: tag });
  return;
}
