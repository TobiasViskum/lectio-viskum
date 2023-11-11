export function getSubmitStudentFeedbackForm(
  __EVENTVALIDATION: string,
  __VIEWSTATEY_KEY: string,
  html: string,
) {
  let form = new FormData();

  form.append("time", "0");
  form.append(
    "__EVENTTARGET",
    "s$m$Content$Content$Elevindhold$tocAndToolbar$elevindholdEditLV$ctrl1$HomeworkEditLV$ctrl0$editor",
  );
  form.append("__EVENTARGUMENT", "save");
  form.append("__LASTFOCUS", "");
  form.append(
    "__SCROLLPOSITION",
    '{"tableId":"","rowIndex":-1,"rowScreenOffsetTop":-1,"rowScreenOffsetLeft":-1,"pixelScrollTop":0,"pixelScrollLeft":0}',
  );
  form.append("__VIEWSTATEY_KEY", __VIEWSTATEY_KEY);
  form.append("__VIEWSTATEX", "");
  form.append("__VIEWSTATE", "");
  form.append("__SCROLLPOSITIONX", "0");
  form.append("__SCROLLPOSITIONY", "0");
  form.append("__VIEWSTATEENCRYPTED", "");
  form.append("__EVENTVALIDATION", __EVENTVALIDATION);
  form.append("s$m$searchinputfield", "");
  form.append(
    "s$m$Content$Content$Elevindhold$tocAndToolbar$hiddenFieldTocToggleStatus",
    "",
  );

  form.append(
    "s$m$Content$Content$Elevindhold$tocAndToolbar$elevindholdEditLV$ctrl1$HomeworkEditLV$ctrl0$editor$ed",
    html,
  );
  form.append(
    "s$m$Content$Content$Elevindhold$tocAndToolbar$elevindholdEditLV$ctrl1$HomeworkEditLV$ctrl0$editor$isDirty",
    "1",
  );
  form.append(
    "s$m$Content$Content$Elevindhold$tocAndToolbar$elevindholdEditLV$ctrl1$HomeworkEditLV$ctrl0$editor$editorBookmarkField",
    "",
  );
  form.append(
    "s$m$Content$Content$Elevindhold$tocAndToolbar$elevindholdEditLV$ctrl1$HomeworkEditLV$ctrl0$editor$ca",
    "",
  );
  form.append("masterfootervalue", "X1!ÆØÅ");
  form.append("LectioPostbackId", "");

  return form;
}
