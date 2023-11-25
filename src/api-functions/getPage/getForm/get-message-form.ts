export function getMessageForm(
  messageId: string,
  __VIEWSTATEY_KEY: string,
  masterfootervalue: string,
) {
  const form = new FormData();

  form.append("time", "0");
  form.append("__EVENTTARGET", "__Page");
  form.append("__EVENTARGUMENT", `$LB2$_MC_$_${messageId}`);
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
  form.append("s$m$searchinputfield", "");
  form.append("s$m$Content$Content$ListGridSelectionTree$folders", "-50");
  form.append("s$m$Content$Content$MarkChkDD", "-1");
  form.append("s$m$Content$Content$SPSearchText$tb", "");
  form.append("masterfootervalue", masterfootervalue);
  form.append("LectioPostbackId", "");

  return form;
}
