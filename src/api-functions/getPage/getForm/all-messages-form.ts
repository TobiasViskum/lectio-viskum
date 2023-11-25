type Props = {
  __VIEWSTATEY_KEY: string;
  masterFooterValue: string;
};

export function getAllMessagesForm({
  __VIEWSTATEY_KEY,
  masterFooterValue,
}: Props) {
  let form = new FormData();

  form.append("time", "0");
  form.append("__EVENTTARGET", "s$m$Content$Content$threadGV$ctl103$ctl05");
  form.append("__EVENTARGUMENT", "");
  form.append("__LASTFOCUS", "");
  form.append(
    "__SCROLLPOSITION",
    '{"tableId":"","rowIndex":-1,"rowScreenOffsetTop":-1,"rowScreenOffsetLeft":-1,"pixelScrollTop":3005,"pixelScrollLeft":0}',
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
  form.append("masterfootervalue", masterFooterValue);
  form.append("LectioPostbackId", "");

  return form;
}
