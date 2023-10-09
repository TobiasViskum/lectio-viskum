import { Logo } from "@/assets";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "./Menu";
import { HomeIcon2 } from "@/components/icons/HomeIcon";
import { Account } from "./Account";
import { lectioAPI } from "@/lib/lectio-api";
import { getCredentials } from "@/lib/auth/getCredentials";
import { AccountWrapper } from "./AccountWrapper";
import { Suspense } from "react";

export async function Navbar() {
  return (
    <div className="fixed h-16 w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <nav className="h-full flex items-center px-4 gap-x-4 sm:px-8">
        <Link href={"/"} className="hidden sm:block aspect-[3.375_/_1] h-8">
          <Image src={Logo} alt="LectioV" height={32} width={108} className="aspect-[3.375_/_1]" />
        </Link>
        <Link href={"/"} className="block sm:hidden aspect-[1_/_1] h-9 p-1">
          <HomeIcon2 className="h-7 w-7"></HomeIcon2>
        </Link>
        <Button variant={"ghost"} className="flex gap-x-2 items-center ">
          <Link className="font-semibold " href={"/skema"}>
            Skema
          </Link>
          <CalendarIcon />
        </Button>
        <Menu />
        <Suspense fallback={<p>Loading</p>}>
          <AccountWrapper />
        </Suspense>
      </nav>
      <Separator />
    </div>
  );
}
