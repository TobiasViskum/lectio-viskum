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
