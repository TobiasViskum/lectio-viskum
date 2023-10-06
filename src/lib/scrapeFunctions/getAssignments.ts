import { getAuthenticatedPage } from "../getAuthenticatedPage";

export async function getAssignments({ username, password, gym }: StandardProps) {
  try {
    const page = await getAuthenticatedPage({
      username: username,
      password: password,
      targetPage: `https://www.lectio.dk/lectio/${gym}/OpgaverElev.aspx`,
      gym: gym,
    });

    await Promise.all([page.waitForNavigation(), page.click("#s_m_Content_Content_CurrentExerciseFilterCB")]);

    const assignments = await page.$$eval("#s_m_Content_Content_ExerciseGV > tbody > tr:not(:first-child)", (rows) => {
      return rows.map((row) => {
        return {
          href: row.children[2].children[0].getAttribute("href"),
          week: row.children[0].children[0].innerHTML,
          class: row.children[1].children[0].innerHTML,
          title: row.children[2].children[0].innerHTML,
          dueTo: row.children[3].innerHTML,
          assignmentLength: row.children[4].innerHTML,
          status: row.children[5].children[0] ? row.children[5].children[0].innerHTML : row.children[5].innerHTML,
          absence: row.children[6].innerHTML.replace("&nbsp;", ""),
          awaiter: row.children[7].innerHTML,
          assignmentDescription: row.children[8].innerHTML,
          grade: row.children[9].innerHTML,
          gradeNote: row.children[10].innerHTML,
        };
      });
    });

    await page.browser().close();

    if (assignments.length === 0) {
      return null;
    }
    return assignments;
  } catch {
    return null;
  }
}
