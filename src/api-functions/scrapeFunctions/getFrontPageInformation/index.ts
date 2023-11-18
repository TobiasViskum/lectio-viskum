import { getAuthenticatedPage } from "@/api-functions/getPage";

export async function getFrontPageInformation() {
  const res = await getAuthenticatedPage({
    page: "front",
  });

  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  if (res === null) return res;

  const frontPageInformation: FrontPageInformation = {
    importantInformation: [],
    unreadMessages: [],
    education: {
      nextAssignments: [],
      nextHomework: [],
    },
  };

  const $ = res.$;

  const $spans = $(
    "#s_m_Content_Content_importantInfo > tbody > tr > td:not(:first-child) > span",
  );
  for (let i = 0; i < $spans.length; i++) {
    const span = $spans[i];
    const $span = $(span);
    const splitText = $span.text().trim().split("\n");

    frontPageInformation.importantInformation.push(splitText);
  }

  const $trs = $("#s_m_Content_Content_BeskederInfo > tbody > tr");
  for (let i = 0; i < $trs.length; i++) {
    const tr = $trs[i];
    const $tr = $(tr);

    const $a = $tr.find("td:nth-child(2) > a");
    const title = $a.text();
  }

  return frontPageInformation;
}
