export function getUserActionAssignmentForm(
  __EVENTVALIDATION: string,
  __VIEWSTATE: string,
  masterFooterValue: string,
  userId: string,
  deleteIndex?: number,
) {
  let form = new FormData();

  form.append("time", "0");
  form.append(
    "__EVENTTARGET",
    deleteIndex ? "m$Content$groupMembersGV" : "m$Content$groupStudentAddBtn",
  );
  form.append("__EVENTARGUMENT", deleteIndex ? `DEL$${deleteIndex}` : "");
  form.append("__LASTFOCUS", "");
  form.append("__SCROLLPOSITION", "");
  form.append("__VIEWSTATEX", "");
  form.append("__VIEWSTATEY_KEY", deleteIndex ? __VIEWSTATE : "");
  form.append("__VIEWSTATE", deleteIndex ? "" : __VIEWSTATE);
  form.append("__VIEWSTATEENCRYPTED", "");
  form.append("__EVENTVALIDATION", __EVENTVALIDATION);
  form.append("s$m$searchinputfield", "");
  form.append("m$Content$groupStudentAddDD", userId);
  form.append("m$Content$CommentsTB$tb", "");
  form.append("m$Content$choosedocument$selectedDocumentId", "");
  form.append("masterfootervalue", masterFooterValue);
  form.append("LectioPostbackId", "");

  return form;
}
