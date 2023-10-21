"use server";

import { cookies } from "next/headers";

export async function setCookies(lectioCookies: string) {
  try {
    const prevCookies = cookies().get("lectioCookies");
    if (prevCookies === undefined) {
      cookies().set("lectioCookies", lectioCookies);
    } else if (prevCookies.value !== lectioCookies) {
      cookies().set("lectioCookies", lectioCookies);
    }
  } catch {}

  return;
}
