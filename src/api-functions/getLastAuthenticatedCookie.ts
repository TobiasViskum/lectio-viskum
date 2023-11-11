import { getLectioProps } from "@/lib/auth/getLectioProps";

export function getLastAuthenticatedCookie() {
  const date = new Date()
    .toString()
    .replace(/\(.*\)/, "(Central European Standard Time)");
  const LastAuthenticatedPageLoad = encodeURI(date) + ";";

  const lectioCookies = getLectioProps().lectioCookies;

  const newCookies = [lectioCookies, LastAuthenticatedPageLoad].join("");

  return newCookies;
}
