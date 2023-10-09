"use server";

import { revalidateTag } from "next/cache";

type Props = { username: string };

export async function clearUserCache({ username }: Props) {
  revalidateTag(`user-${username}`);
  return;
}
