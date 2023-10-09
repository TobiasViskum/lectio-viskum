import { getCredentials } from "@/lib/auth/getCredentials";
import { lectioAPI } from "@/lib/lectio-api";
import { Account } from "./Account";

export async function AccountWrapper() {
  const credentials = getCredentials();
  const user = await lectioAPI.getStudent.byCredentials({
    ...credentials,
    tag: `user-${credentials.username}`,
  });

  return (
    <>
      <Account strUser={JSON.stringify(user)} />
    </>
  );
}
