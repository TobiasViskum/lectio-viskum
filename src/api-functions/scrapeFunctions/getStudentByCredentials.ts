import { getAuthenticatedPage } from "../getPage";

export async function getStudentByCredentials({
  lectioCookies,
  schoolCode,
}: StandardProps) {
  const res = await getAuthenticatedPage({
    lectioCookies: lectioCookies,
    schoolCode: schoolCode,
    page: "student-by-credentials",
  });

  if (res === null) return res;
  if (res === "Not authenticated") return res;
  if (res === "Forbidden access") return res;
  if (res === "Invalid school") return res;

  const $ = res.$;
  const fetchCookie = res.fetchCookie;

  const imgHref = [
    "https://lectio.dk",
    $("img#s_m_HeaderContent_picctrlthumbimage").attr("src"),
    "&fullsize=1",
  ].join("");

  const imageBase64 = await fetchCookie(imgHref, {
    method: "GET",
    headers: { Cookie: lectioCookies },
  })
    .then(async (res) => {
      try {
        const arrayBuffer = await res.arrayBuffer();
        const contentType = res.headers.get("content-type");
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        const fullSrc = `data:${contentType};base64,${base64}`;

        return fullSrc;
      } catch {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });

  let studentId = $(
    "div#s_m_HeaderContent_MainTitle[data-lectiocontextcard]",
  ).attr("data-lectiocontextcard");
  if (studentId) {
    studentId = studentId.replace("S", "");
  }

  const nameAndClass = $(
    "div#s_m_HeaderContent_MainTitle > span.ls-hidden-smallscreen",
  ).text();

  let name = "";
  let studentClass = "";
  const nameMatch = nameAndClass.match(/Eleven ([a-z0-9 ]+), /i);
  const classMatch = nameAndClass.match(/Eleven [a-z0-9 ]+, ([a-z0-9-]+) /i);

  if (nameMatch) {
    name = nameMatch[1];
  }
  if (classMatch) {
    studentClass = classMatch[1];
  }

  return {
    name: name,
    studentClass: studentClass,
    studentId: studentId || "",
    imgUrl: imgHref,
    imgSrc: imageBase64,
  } as Student;
}
