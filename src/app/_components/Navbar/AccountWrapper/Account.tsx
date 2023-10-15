"use client";

import { clearUserCache } from "@/app/_actions/actions";
import { profile } from "@/assets";
import { setAuthCookies } from "@/lib/auth/setAuthCookies";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  strUser: string;
};

export function Account({ strUser }: Props) {
  const user = JSON.parse(strUser) as Student | null;
  const router = useRouter();

  if (user === null) {
    return <Image width={40} height={40} src={profile.src} alt="img" className="object-cover" />;
  }

  async function handleLogout() {
    await clearUserCache({ username: "tobi688c" });
    router.refresh();
    setAuthCookies({ username: "", password: "", schoolCode: "" });
    router.push("/log-ind");
  }

  return (
    <button className="rounded-full">
      <Image onClick={handleLogout} src={user.imgSrc} width={40} height={40} alt="img" className="object-cover rounded-full obj aspect-square" />
    </button>
  );
}
