import { getMessagePage } from "@/api-functions/getPage/getMessagePage";
import { getStudentById, getTeacherById } from "..";
import { urlify } from "@/util/urlify";

type MessageChat = {
  title: string;
  date: Date;
  sender: Student | Teacher;
  content: string;
  attachedFiles: LectioDocument[];
  edits: Date[];
};

type FullMessage = {
  sender: string;
  receivers: string;
  title: string;
  chat: MessageChat[];
};

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
  const $ = res.$;

  const message: FullMessage = {
    sender: "",
    receivers: "",
    title: "",
    chat: [],
  };

  const $div1 = $("#Modtagere > div");
  const sender = $div1.find("span").text();

  message.sender = sender;
  message.receivers = $div1.text().replace(sender, "").trim();

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
      sender: { imgSrc: "", imgUrl: "", name: "" } as Student | Teacher,
      date: new Date(1970),
      content: "",
      edits: [],
      attachedFiles: [],
    };

    await getSender($senderDiv, chat);

    getDate($senderDiv, chat);

    const $messageDiv = $div.find(
      ".message-thread-message > .message-container > .message",
    );

    const title = $messageDiv
      .find(".message-replysum-header-menu > div:first-child > div")
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
            const newLink = urlify(href);
            $elem.replaceWith(newLink);
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

  return message;
}

async function getSender($senderDiv: cheerio.Cheerio, chat: MessageChat) {
  let senderId = (
    $senderDiv.find("span").attr("data-lectiocontextcard") || ""
  ).replace("U", "");
  if (!isNaN(Number(senderId))) {
    senderId = (Number(senderId) - 1).toString();
  }

  if (senderId) {
    const foundTeacher = await getTeacherById({ teacherId: senderId });

    if (foundTeacher === null || typeof foundTeacher === "string") {
      const foundStudent = await getStudentById({ userId: senderId });
      if (foundStudent !== null && typeof foundStudent !== "string") {
        chat.sender = foundStudent;
      }
    } else {
      chat.sender = foundTeacher;
    }
  } else {
    chat.sender.name = $senderDiv.find("span").text().trim();
  }
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
