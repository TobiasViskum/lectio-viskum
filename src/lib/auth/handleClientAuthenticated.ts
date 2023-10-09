export function handleClientAuthenticated() {
  const cookies = document.cookie;

  const check1 = /username=[a-z0-9]+/.test(cookies);
  const check2 = /password=[a-z0-9]+/.test(cookies);
  const check3 = /schoolCode=[0-9]+/.test(cookies);
  if (check1 && check2 && check3) {
    return;
  }

  document.cookie = "username=; expires=; path=/;";
  document.cookie = "password=; expires=; path=/;";
  document.cookie = "schoolCode=; expires=; path=/;";
  return;
}
