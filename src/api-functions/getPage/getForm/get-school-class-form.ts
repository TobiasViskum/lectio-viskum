export function getSchoolClassForm(
  __VIEWSTATEX: string,
  __EVENTVALIDATION: string,
) {
  const formData = new FormData();
  formData.append("time", "0");
  formData.append(
    "__EVENTTARGET",
    "0m$Content$AktuelAndAfdelingCB$ShowOnlyAktulleCB",
  );
  formData.append("__EVENTARGUMENT", "");
  formData.append("__LASTFOCUS", "");
  formData.append("__SCROLLPOSITION", "");
  formData.append("__VIEWSTATEX", __VIEWSTATEX);
  formData.append("__VIEWSTATEY_KEY", "");
  formData.append("__VIEWSTATE", "");
  formData.append("__EVENTVALIDATION", __EVENTVALIDATION);
  formData.append("m$ChooseTerm$term", new Date().getFullYear().toString());
  formData.append("m$searchinputfield", "");
  formData.append("masterfootervalue", "X1!ÆØÅ");
  formData.append("LectioPostbackId", "");

  return formData;
}
