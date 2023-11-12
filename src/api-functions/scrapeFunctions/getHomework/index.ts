import { getAuthenticatedPage } from "@/api-functions/getPage";
import { pattern1, pattern2, pattern3 } from "../getSchedule/timePatterns";
export async function getHomework() {
  const res = await getAuthenticatedPage({
    page: "homework",
  });

  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  if (res === null) return res;

  const $ = res.$;

  const $trs = $(
    "table#s_m_Content_Content_MaterialLektieOverblikGV > tbody > tr",
  );

  console.log($trs.length);
}
