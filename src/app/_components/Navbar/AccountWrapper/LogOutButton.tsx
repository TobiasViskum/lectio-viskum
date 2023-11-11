"use client";

import { LogOutUser } from "@/app/_actions/log-out";
import { LoadingSpinner } from "@/components/loading-components/LoadingSpinner";
import { MenubarItem } from "@/components/ui/menubar";
import { getCookies } from "@/lib/auth/getLectioCookies";
import { setAuthCookies } from "@/lib/auth/setAuthCookies";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogOutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    const cookies = getCookies();
    await LogOutUser(cookies.userId);
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
    <MenubarItem
      disabled={isLoggingOut}
      onClick={(e) => {
        setIsLoggingOut(true);
        e.preventDefault();
        handleLogout();
      }}
      className="flex cursor-pointer gap-x-4 bg-red-800 px-2 py-2 text-center font-semibold transition-colors focus:bg-red-600"
    >
      <LogOut />
      <div className="flex items-center gap-x-2">
        <p>{isLoggingOut ? "Logger ud..." : "Log ud"}</p>
        {isLoggingOut && <LoadingSpinner className="h-5 w-5" />}
      </div>
    </MenubarItem>
  );
}
