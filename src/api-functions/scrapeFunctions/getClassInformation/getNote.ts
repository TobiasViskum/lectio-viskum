export function getNote($: cheerio.Root) {
  const note = $("#s_m_Content_Content_tocAndToolbar_ActNoteTB_tb").text();
  return note;
}
