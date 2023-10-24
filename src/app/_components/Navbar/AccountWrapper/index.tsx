import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import { Account } from "./Account";
import { getServerUrl } from "@/lib/next/getServerUrl";
import Image from "next/image";
import { profile } from "@/assets";

export async function AccountWrapper() {
  const url = getServerUrl();

  if (!url || url.includes("/log-ind")) {
    return (
      <Image
        width={40}
        height={40}
        src={profile.src}
        alt="img"
        className="object-cover"
      />
    );
  }

  const lectioProps = getLectioProps();
  const date1 = new Date().getTime();

  // const user = await lectioAPI.getStudent.byCredentials({
  //   ...lectioProps,
  //   tag: `user-${lectioProps.username}`,
  // });

  const user = null;

  return (
    <>
      <Account strUser={JSON.stringify(user)} />
    </>
  );
}
