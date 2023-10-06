import { getAuthenticatedPage } from "../getAuthenticatedPage";

export async function getAllMessages({ username, password, gym }: StandardProps) {
  try {
    const page = await getAuthenticatedPage({
      username: username,
      password: password,
      targetPage: `https://www.lectio.dk/lectio/${gym}/beskeder2.aspx?type=selecthold&elevid=53701992282&holdid=53701922169`,
      gym: gym,
    });

    await Promise.all([page.waitForNavigation(), page.click('td[colspan="9"] > table > tbody > tr > td:last-child > a')]);

    const messages = await page.$$eval("#s_m_Content_Content_threadGV_ctl00 > tbody > tr:not([class])", (elements) => {
      return elements.map((elem) => {
        const title = elem.children[3].children[0].children[0].textContent as string;
        const latestSender = elem.children[4].children[0].getAttribute("title") as string;
        const sender = elem.children[5].children[0].getAttribute("title") as string;
        let receivers = elem.children[6].children[0].getAttribute("title") as string;
        const latestChange = elem.children[7].textContent as string;

        receivers = (function formatReceivers() {
          let formattedReceivers = receivers.replaceAll("\n", ", ").replace("1. G. elev", "1.G elever").replace("2. G. elev", "2.G elever").replace("3. G. elev", "3.G elever").replace("4. G. elev", "4.G elever").replace("Alle Lærere", "Alle lærere").replace("STX e", "STX elever").replace("G-elev", "-elever").replace("-eleve,", "-elever,").replace("td-ele,", "td-elever,");

          const lPattern = /Alle [a-zæøå]+-lære/i;
          const lMatch = formattedReceivers.match(lPattern);

          if (lMatch) {
            let match = lMatch[0];
            const hyphenIndex = match.indexOf("-");
            if (match[hyphenIndex - 1] !== "s") {
              match = match.replace("-", "s");
            }
            match = match.split("lære")[0] + "lærere";
            match = match.slice(0, 5) + match.charAt(5).toLowerCase() + match.slice(6);
            formattedReceivers = formattedReceivers.replace(lMatch[0], match);
          }
          return formattedReceivers;
        })();

        return { title: title, latestSender: latestSender, sender: sender, receivers: receivers, latestChange: latestChange };
      });
    });

    await page.browser().close();

    if (messages.length === 0) {
      return null;
    }

    return messages;
  } catch {
    return null;
  }
}
