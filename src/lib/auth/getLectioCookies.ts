export function getLectioCookies() {
  const cookies = document.cookie.split("; ");

  let lectioCookies = "";

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    if (cookie.includes("lectioCookies=")) {
      lectioCookies = cookie.replace("lectioCookies=", "");
      break;
    }
  }
  lectioCookies = decodeURIComponent(lectioCookies);

  return lectioCookies;
}
