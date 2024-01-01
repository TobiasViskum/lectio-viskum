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
      username: username.value === "guest123" ? "tobi688c" : username.value,
      password: password.value === "guest123" ? "10Elefanter!" : password.value,
      schoolCode: schoolCode.value,
      lectioCookies: decodeURIComponent(lectioCookies.value),
      userId: userId.value,
    } as {
      username: string;
      password: string;
      lectioCookies: string;
      schoolCode: string;
      userId: string;
    };
  }
  redirect("/log-ind?redirected=true");
}
