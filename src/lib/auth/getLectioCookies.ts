export function getCookies() {
  const splitCookies = document.cookie.split("; ");

  let cookies = {
    username: splitCookies
      .find((c) => c.includes("username="))
      ?.replace("username=", ""),
    password: splitCookies
      .find((c) => c.includes("password="))
      ?.replace("password=", ""),
    schoolCode: splitCookies
      .find((c) => c.includes("schoolCode="))
      ?.replace("schoolCode=", ""),
    lectioCookies: splitCookies
      .find((c) => c.includes("lectioCookies="))
      ?.replace("lectioCookies=", ""),
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
