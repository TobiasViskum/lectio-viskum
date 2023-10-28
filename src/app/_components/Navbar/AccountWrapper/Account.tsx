"use client";

import { clearUserCache } from "@/app/_actions/actions";
import { profile } from "@/assets";
import { getCookies } from "@/lib/auth/getLectioCookies";
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

  async function handleLogout() {
    const cookies = getCookies();
    await clearUserCache({ userId: cookies.userId });
    router.refresh();
    setAuthCookies({
      username: "",
      password: "",
      schoolCode: "",
      lectioCookies: "",
      userId: "",
    });
    router.push("/log-ind");
  }

  return (
    <button className="aspect-square h-10 w-10 rounded-full">
      <Image
        onClick={handleLogout}
        src={user.imgSrc || profile}
        width={40}
        height={40}
        alt="img"
        className="obj aspect-square rounded-full object-cover"
      />
    </button>
  );
}
