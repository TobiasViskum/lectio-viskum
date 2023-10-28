export function getCookies() {
  const splitCookies = document.cookie.split("; ");

  let cookies = {
    username: splitCookies
      .find((c) => c.includes("username="))
      ?.replace("username=", "") as string,
    password: splitCookies
      .find((c) => c.includes("password="))
      ?.replace("password=", "") as string,
    schoolCode: splitCookies
      .find((c) => c.includes("schoolCode="))
      ?.replace("schoolCode=", "") as string,
    lectioCookies: splitCookies
      .find((c) => c.includes("lectioCookies="))
      ?.replace("lectioCookies=", "") as string,
    userId: splitCookies
      .find((c) => c.includes("userId="))
      ?.replace("userId=", "") as string,
  };

  for (const [k, value] of Object.entries(cookies)) {
    if (value) {
      const key = k as keyof typeof cookies;
      const newValue = decodeURIComponent(value);
      cookies[key] = newValue;
    }
  }

  return cookies;
}
