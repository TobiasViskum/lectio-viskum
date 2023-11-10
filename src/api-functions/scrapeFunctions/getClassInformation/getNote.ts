import { urlify } from "@/util/urlify";

export function getNote($: cheerio.Root) {
  let note = $("#s_m_Content_Content_tocAndToolbar_ActNoteTB_tb").text();
  note = urlify(note);
  if (note === "") {
    return [];
  }

  return note.split("\n");
}
