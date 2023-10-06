import { getAuthenticatedPage } from "../getAuthenticatedPage";

export async function getAllTeachers({ username, password, gym }: StandardProps) {
  try {
    const page = await getAuthenticatedPage({
      username: username,
      password: password,
      targetPage: `https://www.lectio.dk/lectio/${gym}/FindSkema.aspx?type=laerer`,
      gym: gym,
    });

    const teachers = await page.$$eval("[data-lectiocontextcard]", (elem) =>
      elem.map((item) => {
        const name = item.innerHTML.split(" (")[0];
        const initials = item.innerHTML.split(" (")[1].replace(")", "");
        const href = ["https://lectio.dk", item.getAttribute("href")].join("") as string;

        return { name: name, initials: initials, href: href, img: "" };
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
