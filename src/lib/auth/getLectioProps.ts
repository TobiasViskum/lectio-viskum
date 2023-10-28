import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function getLectioProps() {
  const cookieStore = cookies();
  const username = cookieStore.get("username");
  const password = cookieStore.get("password");
  const schoolCode = cookieStore.get("schoolCode");
  const lectioCookies = cookieStore.get("lectioCookies");
  const userId = cookieStore.get("userId");

  if (username && password && schoolCode && lectioCookies && userId) {
    return {
      username: username.value,
      password: password.value,
      schoolCode: schoolCode.value,
      lectioCookies: decodeURIComponent(lectioCookies.value),
      userId: userId.value,
    } as StandardProps & {
      username: string;
      password: string;
      userId: string;
    };
  }
  redirect("/log-ind?redirected=true");
}
