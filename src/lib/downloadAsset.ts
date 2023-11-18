import { standardFetchOptions } from "@/api-functions/standardFetchOptions";
import { getCookies } from "./auth/getLectioCookies";
import { getFetchCookie } from "@/lib/getFetchCookie";
import { getLoginForm } from "./login-form";
import { load } from "cheerio";

export async function* downloadAsset(href: string, name: string) {
  const { fetchCookie } = getFetchCookie();
  const cookies = getCookies();

  async function getLoginText() {
    return await fetchCookie(`/lectio/${cookies.schoolCode}/login.aspx`, {
      method: "GET",
      next: { revalidate: 0 },
      cache: "no-cache",
      ...standardFetchOptions,
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
  if (text === null || text === "") throw new Error("Download failed!");
  const form = getForm(text);
  if (form === null) throw new Error("Download failed!");
  yield 10;
  const targetPageContent = await fetchCookie(
    `/lectio/${cookies.schoolCode}/login.aspx?prevurl=forside.aspx`,
    { method: "POST", body: form, ...standardFetchOptions },
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
    yield 20;
    try {
      const res = await fetchCookie(href, {
        method: "GET",
        ...standardFetchOptions,
      });
      const fileContentLength = res.headers.get("Content-Length");
      if (res.body && fileContentLength) {
        const reader = res.body.getReader();
        const contentLength = +fileContentLength;
        let receivedLength = 0;
        let chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          chunks.push(value);
          receivedLength += value.length;
          yield (receivedLength / contentLength) * 70 + 20;
        }
        let chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for (let chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }
        const blob = new Blob([chunksAll]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.download = name;
        link.click();
        return true;
      }
    } catch {
      throw new Error("Download failed!");
    }
  }
  throw new Error("Download failed!");
}
