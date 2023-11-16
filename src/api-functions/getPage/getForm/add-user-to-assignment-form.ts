export function getAddUserToAssignmentForm(
  __EVENTVALIDATION: string,
  __VIEWSTATEY_KEY: string,
  masterFooterValue: string,
  userId: string,
) {
  let form = new FormData();

  form.append("time", "0");
  form.append("__EVENTTARGET", "m$Content$groupStudentAddBtn");
  form.append("__EVENTARGUMENT", "");
  form.append("__LASTFOCUS", "");
  form.append("__SCROLLPOSITION", "");
  form.append("__VIEWSTATEY_KEY", __VIEWSTATEY_KEY);
  form.append("__VIEWSTATEX", "");
  form.append("__VIEWSTATE", "");
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
