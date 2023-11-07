const cookies =
  "lectiogsc=1471f01e-8a9f-89e3-941d-b1d88fda94a8; ASP.NET_SessionId=LEQMAMY4M6RGSIW5FBY3RANK44YHIRUPC2CG2I6WKFMXCPCDFYPSAIBA; autologinkey=R8EuBn5FkZtX7kSicJqKhgmgf1jOoDegDixFxLtS; isloggedin3=Y; BaseSchoolUrl=797; LastAuthenticatedPageLoad=Tue%20Nov%2007%202023%2019:09:36%20GMT+0100%20(Central%20European%20Standard%20Time)";
const url =
  "https://www.lectio.dk/lectio/243/aktivitet/aktivitetforside2.aspx?absid=60786884312&prevurl=SkemaNy.aspx%3fweek%3d432023&elevid=53701992282&lectab=elevindhold";

const html =
  '<h1 id="6127806131">Titel</h1><h1 id="1489171124">&nbsp;</h1><p>Normal tekst</p><p style="text-align:right"><strong>Fed tekst til højre</strong></p><p style="text-align:center"><em>Skrå tekst i midten2</em></p><p><s>Gennemstreget</s></p><p><s><em><strong>Det hele</strong></em></s></p><p><span style="color:#e74c3c">Anden farve</span></p><p><span style="background-color:#27ae60">Baggrundfarve og <span style="color:#f1c40f">begge</span></span></p><p>Hej<sup>Løftet<sub>Sænket</sub></sup>&nbsp;KunSænket<sub>hej</sub><sub><sup>Løftet</sup></sub></p><table align="center" border="1" cellpadding="1" cellspacing="1" summary="summart" style="width:500px"><caption>title</caption><tbody><tr><th scope="row">Hej</th><td>Hej</td></tr><tr><th scope="row">T</th><td>O</td></tr><tr><th scope="row">B</th><td>I</td></tr></tbody></table><blockquote><p>®</p></blockquote>';

function getForm(ev, vs) {
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
  form.append("__VIEWSTATEY_KEY", vs);
  form.append("__VIEWSTATEX", "");
  form.append("__VIEWSTATE", "");
  form.append("__SCROLLPOSITIONX", "0");
  form.append("__SCROLLPOSITIONY", "0");
  form.append("__VIEWSTATEENCRYPTED", "");
  form.append("__EVENTVALIDATION", ev);
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

let eventValidation =
  "jvum89TpKk2WReISKaj1ILNPhodRQs9LAJWowD2q0rRzZx4NrTin1h9syG3JMSZLpKlOAr8xffbrcH/08EYBuev4jmgy0n3Cqh/wMwNT3XIIb5QjP86TBZzfnkR9R80TROvqhjmZqVxuTwTz9+o38AoRUmgVt74e/LRZU5fj/QVBaWi/huBVmNNdxCJhr9SFCEQ08jAR7bMYECbqeKVLnv3HYMt3doeIAkzYj8ljDwnz0lI1j39xE53kZKCwwJUX8KVyk6cTw+TTwAJQHiHa9iPIRUcJRryj2wIOLbJaPPZKph11U97RNQfCD9AyNhgHQIHGYayAmO24ITRFdDGrjBTJAsuafga0RXd91DO/J+62Kr38/ikYNvCBkZb0i5Et4qmUXKU+gIwy6pSgbQqHNzwf98yFjguPhg716nP8ZvwMVvV8/FxbkPegzpdb0Eq3myPBDI9sSmu/txbPyEvr9b0g/iHtnG3W9ba3qqlpayE=";
let viewStateKey =
  "LECWEB2-20231107-190742-12997_000022099320_8BqykGwX666E/b/34yTiCvdfw28=";

async function doFetch() {
  // await fetch(
  //   "https://www.lectio.dk/lectio/243/aktivitet/aktivitetforside2.aspx?absid=60786884312&prevurl=SkemaNy.aspx%3fweek%3d432023&elevid=53701992282&lectab=elevindhold",
  //   { headers: { Cookie: cookies } },
  // ).then(async (res) => {
  //   const text = await res.text();

  //   const p1 = /id=\"__EVENTVALIDATION\".*value=\"(.*)\"/gi;
  //   const m1 = text.match(p1);
  //   if (m1) {
  //     eventValidation = m1[0]
  //       .replace(/id="__EVENTVALIDATION" value=/, "")
  //       .replaceAll('"', "");
  //   }

  //   const p2 = /id=\"__VIEWSTATEY_KEY".*value=\"(.*)\"/gi;
  //   const m2 = text.match(p2);
  //   if (m2) {
  //     viewStateKey = m2[0]
  //       .replace(/id="__VIEWSTATEY_KEY" value=/, "")
  //       .replaceAll('"', "");
  //   }
  // });

  const body = getForm(eventValidation, viewStateKey);

  fetch(url, {
    method: "POST",
    body: body,
    headers: { Cookie: cookies },
  }).then(async (res) => {
    const text = await res.text();
  });
}
doFetch();
