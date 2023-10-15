import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function getCredentials() {
  const cookieStore = cookies();
  const username = cookieStore.get("username");
  const password = cookieStore.get("password");
  const schoolCode = cookieStore.get("schoolCode");

  if (username && password && schoolCode) {
    return {
      username: username.value,
      password: password.value,
      schoolCode: schoolCode.value,
    } as StandardProps;
  }
  redirect("/log-ind?redirected=true");
}
