"use server";

import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { revalidateTag } from "next/cache";

export async function dynamicRevalidation() {
  const credentials = getCredentials();
  const tag = `assignments-${credentials.username}`;
  revalidateTag(tag);
  await lectioAPI.getAssignments({ ...credentials, tag: tag });
  return;
}
