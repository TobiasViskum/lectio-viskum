import { getCookies } from "./auth/getLectioCookies";
import { getFetchCookie } from "./getFetchCookie";
import { getLoginForm } from "./login-form";
import { load } from "cheerio";

export async function downloadAsset(href: string, name: string) {
  const { fetchCookie } = getFetchCookie();
  const cookies = getCookies();

  async function getLoginText() {
    return await fetchCookie(`/lectio/${cookies.schoolCode}/login.aspx`, {
      method: "GET",
      next: { revalidate: 0 },
      cache: "no-cache",
    })
      .then(async (res) => await res.text())
      .catch((err) => null);
  }
  function getForm(text: string) {
    const $ = load(text);

    const __VIEWSTATEX = $("input#__VIEWSTATEX").val();
    const __EVENTVALIDATION = $("input#__EVENTVALIDATION").val();
    const masterFooterValue = $('input[name="masterfootervalue"]').val();

    if (__VIEWSTATEX && __EVENTVALIDATION && masterFooterValue) {
      return getLoginForm({
        __VIEWSTATEX: __VIEWSTATEX,
        __EVENTVALIDATION: __EVENTVALIDATION,
        masterFooterValue: masterFooterValue,
        username: cookies.username || "",
        password: cookies.password || "",
      });
    } else {
      return null;
    }
  }

  let text: string | null = "";
  text = text = await getLoginText();
  if (text === null || text === "") {
    text = await getLoginText();
  }
  if (text === null || text === "") {
    text = await getLoginText();
  }
  if (text === null || text === "") return null;
  const form = getForm(text);
  if (form === null) return null;

  const targetPageContent = await fetchCookie(
    `/lectio/${cookies.schoolCode}/login.aspx?prevurl=forside.aspx`,
    { method: "POST", body: form },
  )
    .then(async (res) => {
      try {
        const text = await res.text();

        if (text.includes("Log ind")) {
          return null;
        } else if (text.includes("Der opstod en ukendt fejl")) {
          return null;
        } else {
          return true;
        }
      } catch {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });

  if (targetPageContent) {
    const res = await fetchCookie(href, { method: "GET" })
      .then((res) => {
        return res.blob();
      })
      .then(async (res) => {
        try {
          const url = URL.createObjectURL(res);
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.download = name;
          link.click();
          return true;
        } catch {
          return null;
        }
      })
      .catch((err) => {
        return null;
      });

    return res;
  }
  return null;
}
