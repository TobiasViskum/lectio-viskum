import "server-only";
import { getAuthenticatedPage } from "../../getPage/getAuthenticatedPage";
import { getAllMessagesPage } from "../../getPage/getAllMessagesPage";
import { getMessageInformation } from "./utils";

type Props = { type: MessagesTypes };

export async function getMessages({ type }: Props) {
  const typeMap = {
    personal: "messages-personal",
    all: "messages-all",
    deleted: "messages-deleted",
    newest: "messages-newest",
    unread: "messages-unread",
    favorites: "messages-favorites",
  } as const;

  let res: GetPageReturn = null;

  if (type === "all") {
    res = await getAllMessagesPage();
  } else {
    res = await getAuthenticatedPage({
      page: typeMap[type],
    });
  }

  if (res === null) return res;
  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  const $ = res.$;

  if ($.html().includes("Ingen beskeder at vise...")) {
    return "No data";
  }

  let messages: Message[] = [];
  const $messages = $(
    "#s_m_Content_Content_threadGV_ctl00 > tbody > tr:not(:first-child)",
  );

  for (let i = 0; i < $messages.length; i++) {
    const tr = $messages[i];
    const $tr = $(tr);

    const messageInformation = getMessageInformation($tr);
    if (messageInformation) {
      messages.push(messageInformation);
    }
  }

  if (messages.length === 0) {
    return "No data";
  }

  return messages;
}
