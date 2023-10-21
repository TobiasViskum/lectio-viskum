import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function getLectioProps() {
  const cookieStore = cookies();
  const username = cookieStore.get("username");
  const password = cookieStore.get("password");
  const schoolCode = cookieStore.get("schoolCode");
  const lectioCookies = cookieStore.get("lectioCookies");

  if (username && password && schoolCode && lectioCookies) {
    return {
      username: username.value,
      password: password.value,
      schoolCode: schoolCode.value,
      lectioCookies: lectioCookies.value,
    } as StandardProps & { username: string; password: string };
  }
  redirect("/log-ind?redirected=true");
}
