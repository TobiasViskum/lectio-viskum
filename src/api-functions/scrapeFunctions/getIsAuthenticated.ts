import { load } from "cheerio";
import { getLoginForm } from "../getPage/getForm/login-form";
import makeFetchCookie from "fetch-cookie";
import { getSchoolBySchoolCode } from "./getSchoolBySchoolCode";

export async function getIsAuthenticated({
  username,
  password,
  schoolCode,
}: AuthProps) {
  const baseUrl = "https://www.lectio.dk/lectio";

  const store = new makeFetchCookie.toughCookie.CookieJar();
  const fetchCookie = makeFetchCookie(fetch, store);

  const form = await fetchCookie(`${baseUrl}/${schoolCode}/login.aspx`)
    .then(async (res) => {
      try {
        const text = await res.text();

        const $ = load(text);
        const __VIEWSTATEX = $("input#__VIEWSTATEX").val();
        const __EVENTVALIDATION = $("input#__EVENTVALIDATION").val();
        const masterFooterValue = $('input[name="masterfootervalue"]').val();

        if (__VIEWSTATEX && __EVENTVALIDATION && masterFooterValue) {
          return getLoginForm({
            __VIEWSTATEX: __VIEWSTATEX,
            __EVENTVALIDATION: __EVENTVALIDATION,
            masterFooterValue: masterFooterValue,
            username: username,
            password: password,
          });
        } else {
          return null;
        }
      } catch {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });

  if (form === null) {
    return null;
  }

  const cookies = await fetchCookie(`${baseUrl}/${schoolCode}/login.aspx`, {
    method: "POST",
    body: form,
  })
    .then(async (res) => {
      const text = await res.text();
      if (text.includes("Log ind")) {
        return {
          isAuthenticated: false,
          lectioCookies: "",
          studentId: "",
        };
      } else if (text.includes("Der opstod en ukendt fejl")) {
        const school = await getSchoolBySchoolCode({ schoolCode: schoolCode });
        if (school === null) return "Invalid school";
        return null;
      } else {
        const $ = load(text);
        let studentId = "";
        const tempStudentId = $("#s_m_HeaderContent_MainTitle").attr(
          "data-lectiocontextcard",
        );
        if (tempStudentId) {
          studentId = tempStudentId.replace("S", "");
        }

        const cookies = store.getCookiesSync("https://www.lectio.dk");

        let lectiogsc = null;
        let ASP_NET_SessionId = null;
        try {
          lectiogsc = cookies.find((obj: any) => obj.key === "lectiogsc");
          ASP_NET_SessionId = cookies.find(
            (obj: any) => obj.key === "ASP.NET_SessionId",
          );
        } catch {}

        if (lectiogsc && ASP_NET_SessionId) {
          const date = new Date()
            .toString()
            .replace(/\(.*\)/, "(Central European Summer Time)");
          const encodedDate = encodeURI(date);

          let lectioCookies = "";
          lectioCookies += `ASP.NET_SessionId=${ASP_NET_SessionId.value};`;
          lectioCookies += `lectiogsc=${lectiogsc.value};`;
          lectioCookies += `LastAuthenticatedPageLoad=${encodedDate};`;

          return {
            isAuthenticated: true,
            lectioCookies: lectioCookies,
            studentId: studentId,
          };
        }
      }
      return null;
    })
    .catch((err) => {
      return null;
    });

  return cookies;
}
