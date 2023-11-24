import { getMessagePage } from "@/api-functions/getPage/getMessagePage";

export async function getMessage(messageId: string) {
  const res = await getMessagePage(messageId);

  if (res === null) return res;
  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;
  const $ = res.$;

  type MessageChat = {
    title: string;
    content: string[];
    attachedFiles: LectioDocument[];
    edit: Date[];
  };

  type FullMessage = {
    sender: string;
    receivers: string;
    chat: MessageChat[];
  };

  const message: FullMessage = {
    sender: "",
    receivers: "",
    chat: [],
  };

  const $div1 = $("#Modtagere > div");
  const sender = $div1.find("span").text();
  message.sender = sender;
  message.receivers = $div1.text().replace(sender, "").trim();

  const editRegex =
    /Redigeret af .* ([0-9]{1,2}\/[0-9]{1,2}-[0-9]{4} [0-9]{1,2}:[0-9]{1,2})/;
  const $gridRowMessages = $(
    "#s_m_Content_Content_MessageThreadCtrl_MessagesGV > tbody > tr > td >div #GridRowMessage",
  );
  for (let i = 0; i < $gridRowMessages.length; i++) {
    const div = $gridRowMessages[i];
    const $div = $(div);
  }

  //   const dateText = $tbody
  //     .find("tr:first-child > td > div > :first-child")
  //     .text();
  //   const dateMatch = dateText.match(
  //     /[0-9]{1,2}-[0-9]{1,2}-[0-9]{4} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/,
  //   );
  //   if (dateMatch) {
  //     const splitDateMatch = dateMatch[0].split(" ")
  //     const splitDate = splitDateMatch[0].split("-")
  //     const dayNum = Number(splitDate[0])
  //     const monthNum = Number(splitDate[1])
  //     const yearNum = Number(splitDate[2])

  //     const splitTime = splitDateMatch[1].split(":")
  //     const hoursNum = Number(splitTime[0])
  //     const minutesNum = Number(splitTime[1])
  //     const secondsNum = Number(splitTime[2])

  //     if (!isNaN(dayNum) && !isNaN(monthNum) && !isNaN(yearNum) && !isNaN(hoursNum) && !isNaN(minutesNum) && !isNaN(secondsNum)) {
  //         message
  //     }

  //     function getChat() {

  //     }
  //   }

  return message;
}
