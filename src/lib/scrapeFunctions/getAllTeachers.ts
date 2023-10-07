import { getAuthenticatedPage } from "../getAuthenticatedPage";

export async function getAllTeachers({ username, password, schoolCode }: StandardProps) {
  try {
    const page = await getAuthenticatedPage({
      username: username,
      password: password,
      targetPage: `https://www.lectio.dk/lectio/${schoolCode}/FindSkema.aspx?type=laerer`,
      schoolCode: schoolCode,
    });

    const teachers = await page.$$eval("[data-lectiocontextcard]", (elem) =>
      elem.map((item) => {
        const name = item.innerHTML.split(" (")[0];
        const initials = item.innerHTML.split(" (")[1].replace(")", "");
        const href = ["https://lectio.dk", item.getAttribute("href")].join("") as string;
        const teacherId = href.split("laererid=")[1];

        return { name: name, initials: initials, teacherId: teacherId, href: href, img: "" };
      })
    );

    await page.browser().close();

    if (teachers.length === 0) {
      return null;
    }

    return teachers;
  } catch {
    return null;
  }
}
