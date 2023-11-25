import { getMessagePage } from "@/api-functions/getPage/getMessagePage";
import { getMessageSender } from "../getMessageSender";
import { getAllTeachers } from "..";

const editRegex =
  /Redigeret af .* ([0-9]{1,2}\/[0-9]{1,2}-[0-9]{4} [0-9]{1,2}:[0-9]{1,2})/;
const dateRegex =
  /[0-9]{1,2}-[0-9]{1,2}-[0-9]{4} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/;

export async function getMessage(messageId: string) {
  const res = await getMessagePage(messageId);

  if (res === null) return res;
  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;

  const allTeachers = await getAllTeachers();
  if (allTeachers === null || typeof allTeachers === "string") return null;

  const $ = res.$;

  const message: FullMessage = {
    sender: "",
    receivers: "",
    title: "",
    chat: [],
  };

  const $gridRowMessages = $(
    "#s_m_Content_Content_MessageThreadCtrl_MessagesGV > tbody > tr > td > div#GridRowMessage",
  );

  for (let i = 0; i < $gridRowMessages.length; i++) {
    const div = $gridRowMessages[i];
    const $div = $(div);

    const $senderDiv = $div.find(".message-thread-message-sender");

    if ($senderDiv.length === 0) continue;

    const chat: MessageChat = {
      title: "",
      sender: "",
      date: new Date(1970),
      content: "",
      edits: [],
      attachedFiles: [],
    };

    const senderName = $senderDiv.find("span").text().trim();
    const foundSender = allTeachers.find((obj) =>
      obj.name.includes(senderName.split(" (")[0]),
    );

    if (foundSender) {
      chat.sender = foundSender;
    } else {
      chat.sender = senderName.replace(/ [0-9]{2}\)/, ")");
    }

    getDate($senderDiv, chat);

    const $messageDiv = $div.find(
      ".message-thread-message > .message-container > .message",
    );

    const title = $messageDiv
      .find(
        ".message-replysum-header-menu > div:first-child > .message-thread-message-header",
      )
      .text()
      .trim();
    if (i === 0) message.title = title;
    chat.title = title;

    const $contents = $messageDiv
      .find(".message-thread-message-content")
      .find("*");

    for (let j = 0; j < $contents.length; j++) {
      const elem = $contents[j];
      const $elem = $(elem);
      const attrs = $elem.attr();

      for (let attr in attrs) {
        if (attr === "href") {
          const href = $elem.attr(attr)!;
          if (href.includes("/lectio/")) {
            $elem.replaceWith(
              `<button data-lectio-href="${href}" class="${"link"}">${$elem
                .text()
                .trim()}</button>`,
            );
          } else {
            $elem.attr("class", "link break-all");
          }
        }
      }
    }

    let content = (
      $messageDiv.find(".message-thread-message-content").html() || ""
    )
      .trim()
      .replace(/\([0-9]+ (KB|MB)\)(, )?/gi, "<br>")
      .replace(
        '<div class="message-attachements">',
        '<div class="message-attachements"> <p class="font-semibold">Vedhæftede filer:</p>',
      );

    chat.content = content;

    message.chat.push(chat);
  }

  const $div1 = $("#Modtagere > div");
  $div1.find("br").replaceWith(", ");
  const sender = $(
    "#s_m_Content_Content_MessageThreadCtrl_MessagesGV > tbody > tr:first-child > td > #GridRowMessage > div:first-child > span",
  ).text();

  message.sender = sender;

  message.receivers = $div1
    .text()
    .replace(sender, "")
    .replace("\n", ", ")
    .replace(/^[,\s]+|[,\s]+$/g, "")
    .replaceAll("Holdet ", "")
    .replaceAll("Gruppen ", "")
    .trim();

  return message;
}

async function getDate($senderDiv: cheerio.Cheerio, chat: MessageChat) {
  const dateMatch = $senderDiv.text().match(dateRegex);
  if (dateMatch) {
    const splitDateMatch = dateMatch[0].split(" ");
    const splitDate = splitDateMatch[0].split("-");
    const dayNum = Number(splitDate[0]);
    const monthNum = Number(splitDate[1]);
    const yearNum = Number(splitDate[2]);

    const splitTime = splitDateMatch[1].split(":");
    const hoursNum = Number(splitTime[0]);
    const minutesNum = Number(splitTime[1]);
    const secondsNum = Number(splitTime[2]);

    const check =
      !isNaN(dayNum) &&
      !isNaN(monthNum) &&
      !isNaN(yearNum) &&
      !isNaN(hoursNum) &&
      !isNaN(minutesNum) &&
      !isNaN(secondsNum);

    if (check) {
      chat.date = new Date(
        yearNum,
        monthNum - 1,
        dayNum,
        hoursNum,
        minutesNum,
        secondsNum,
      );
    }
  }
}
