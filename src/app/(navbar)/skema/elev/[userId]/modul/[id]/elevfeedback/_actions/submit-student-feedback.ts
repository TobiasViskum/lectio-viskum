"use server";

import { getFetchCookie } from "@/lib/getFetchCookie";

export async function submitStudentFeedback(url: string, html: string) {
  const { fetchCookie } = getFetchCookie();
  // const form = getSubmitStudentFeedbackForm()

  const result = await fetchCookie(url, { method: "POST" });
}
