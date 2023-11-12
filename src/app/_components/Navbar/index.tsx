import { Logo, profileLoading } from "@/assets";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { AccountWrapper } from "./AccountWrapper";
import { Suspense } from "react";
import { NavbarSheet } from "./NavbarSheet";
import { BigScreenContent } from "./BigScreenContent";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="fixed top-0 z-50 h-16 w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <nav className="flex h-full items-center px-2 sm:px-4">
        <NavbarSheet />
        <BigScreenContent />

        <Link
          href={"/forside"}
          className="ml-auto mr-auto aspect-[3.375_/_1] h-8 2xl:hidden"
        >
          <Image
            src={Logo}
            alt="logo"
            height={32}
            width={108}
            className="aspect-[3.375_/_1]"
          />
        </Link>

        <div className="grid place-items-center rounded-full 2xl:ml-auto">
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
