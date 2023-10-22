import { Logo, profileLoading } from "@/assets";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon2 } from "@/components/icons/HomeIcon";
import { AccountWrapper } from "./AccountWrapper";
import { Suspense } from "react";
import { getCurrWeekAndYear } from "@/lib/utils";

export async function Navbar() {
  return (
    <div className="fixed top-0 z-50 h-16 w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <nav className="flex h-full items-center gap-x-4 px-4 sm:px-8">
        <Link
          href={"/forside"}
          className="hidden aspect-[3.375_/_1] h-8 sm:block"
        >
          <Image
            src={Logo}
            alt="LectioV"
            height={32}
            width={108}
            className="aspect-[3.375_/_1]"
          />
        </Link>
        <Link href={"/"} className="block aspect-[1_/_1] h-9 p-1 sm:hidden">
          <HomeIcon2 className="h-7 w-7"></HomeIcon2>
        </Link>
        <div>
          <Link
            href={{ pathname: "/skema", query: getCurrWeekAndYear() }}
            className="hidden items-center gap-x-2 rounded-md px-4 py-2 text-sm font-semibold hover:bg-accent sm:flex"
          >
            Skema
            <CalendarIcon />
          </Link>
          <Link href={{ pathname: "/skema", query: getCurrWeekAndYear() }}>
            <CalendarIcon className="mx-3 block h-6 w-6 sm:hidden" />
          </Link>
        </div>
        <div>
          <Link
            href={"/afleveringer"}
            className="hidden items-center gap-x-2 rounded-md px-4 py-2 text-sm font-semibold hover:bg-accent sm:flex"
          >
            Afleveringer
            <PaperPlaneIcon className="-rotate-45" />
          </Link>
          <Link href={"/afleveringer"}>
            <PaperPlaneIcon className="mx-3 block h-6 w-6 -rotate-45 sm:hidden" />
          </Link>
        </div>
        <div>
          <Link
            href={"/beskeder"}
            className="hidden items-center gap-x-2 rounded-md px-4 py-2 text-sm font-semibold hover:bg-accent sm:flex"
          >
            Beskeder
            <EnvelopeClosedIcon />
          </Link>
          <Link href={"/beskeder"}>
            <EnvelopeClosedIcon className="mx-3 block h-6 w-6 sm:hidden" />
          </Link>
        </div>

        <div className="ml-auto grid place-items-center rounded-full">
          <Suspense
            fallback={
              <Image
                src={profileLoading.src}
                alt="img"
                width={40}
                height={40}
                className="animate-pulse object-cover"
              />
            }
          >
            <AccountWrapper />
          </Suspense>
        </div>
      </nav>
      <Separator />
    </div>
  );
}
