import { getAxiosInstance } from "./getAxiosInstance";
import { getLoginForm } from "./login-form";
import { load } from "cheerio";

export async function downloadAsset(href: string, name: string) {
  const { client } = getAxiosInstance();

  const form = await client
    .get(`/lectio/243/login.aspx`)
    .then((res) => {
      const $ = load(res.data);
      const __VIEWSTATEX = $("input#__VIEWSTATEX").val();
      const __EVENTVALIDATION = $("input#__EVENTVALIDATION").val();
      const masterFooterValue = $('input[name="masterfootervalue"]').val();

      if (__VIEWSTATEX && __EVENTVALIDATION && masterFooterValue) {
        return getLoginForm({
          __VIEWSTATEX: __VIEWSTATEX,
          __EVENTVALIDATION: __EVENTVALIDATION,
          masterFooterValue: masterFooterValue,
          username: "tobi688c",
          password: "10Elefanter!",
        });
      } else {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });

  if (form) {
    const targetPageContent = await client
      .post(`/lectio/243//login.aspx?prevurl=forside.aspx`, form)
      .then((res) => {
        if (res.data.includes("Log ind")) {
          return null;
        } else if (res.data.includes("Der opstod en ukendt fejl")) {
          return null;
        } else {
          return true;
        }
      })
      .catch((err) => {
        return null;
      });

    if (targetPageContent) {
      await client
        .get(href, {
          responseType: "blob",
        })
        .then((res) => {
          const url = URL.createObjectURL(res.data);
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.download = name; // The file name
          link.click(); // This will download the file
        })
        .catch((err) => {
          return null;
        });
    }
  } else {
    return null;
  }
}
