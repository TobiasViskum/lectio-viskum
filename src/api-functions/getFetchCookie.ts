import makeFetchCookie from "fetch-cookie";

export function getFetchCookie() {
  const cookieJar = new makeFetchCookie.toughCookie.CookieJar();
  const fetchCookie = makeFetchCookie(fetch, cookieJar);

  return { fetchCookie: fetchCookie, cookieJar: cookieJar };
}
