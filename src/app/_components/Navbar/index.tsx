import { Logo, profileLoading } from "@/assets";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "./Menu";
import { HomeIcon2 } from "@/components/icons/HomeIcon";
import { AccountWrapper } from "./AccountWrapper";
import { Suspense } from "react";
import { getCurrWeekAndYear } from "@/lib/utils";

export async function Navbar() {
  return (
    <div className="fixed h-16 w-full bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <nav className="h-full flex items-center px-4 gap-x-4 sm:px-8">
        <Link href={"/"} className="hidden sm:block aspect-[3.375_/_1] h-8">
          <Image src={Logo} alt="LectioV" height={32} width={108} className="aspect-[3.375_/_1]" />
        </Link>
        <Link href={"/"} className="block sm:hidden aspect-[1_/_1] h-9 p-1">
          <HomeIcon2 className="h-7 w-7"></HomeIcon2>
        </Link>
        <div>
          <Link href={{ pathname: "/skema", query: getCurrWeekAndYear() }} className="sm:flex gap-x-2 items-center font-semibold text-sm rounded-md hover:bg-accent py-2 px-4 hidden">
            Skema
            <CalendarIcon />
          </Link>
          <Link href={{ pathname: "/skema", query: getCurrWeekAndYear() }}>
            <CalendarIcon className="block h-6 w-6 sm:hidden mx-3" />
          </Link>
        </div>
        <div>
          <Link href={"/afleveringer"} className="sm:flex gap-x-2 items-center font-semibold text-sm rounded-md hover:bg-accent py-2 px-4 hidden">
            Afleveringer
            <PaperPlaneIcon className="-rotate-45" />
          </Link>
          <Link href={"/afleveringer"}>
            <PaperPlaneIcon className="block sm:hidden w-6 h-6 -rotate-45 mx-3" />
          </Link>
        </div>
        <Menu />
        <div className="ml-auto grid place-items-center rounded-full">
          <Suspense fallback={<Image src={profileLoading.src} alt="img" width={40} height={40} className="object-cover animate-pulse" />}>
            <AccountWrapper />
          </Suspense>
        </div>
      </nav>
      <Separator />
    </div>
  );
}
