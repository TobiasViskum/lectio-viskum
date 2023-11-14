import { Separator } from "@/components/ui/separator";
import { AccountWrapper } from "./AccountWrapper";
import { Suspense } from "react";
import { NavbarSheet } from "./NavbarSheet";
import { BigScreenContent } from "./BigScreenContent";
import { AccountSkeleton } from "./AccountWrapper/AccountSkeleton";

export function Navbar() {
  return (
    <div className="fixed top-0 z-50 h-16 w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <nav className="flex h-full items-center px-2 sm:px-4">
        <NavbarSheet />
        <BigScreenContent />

        <div className="ml-auto grid place-items-center rounded-full">
          <Suspense fallback={<AccountSkeleton />}>
            <AccountWrapper />
          </Suspense>
        </div>
      </nav>
      <Separator />
    </div>
  );
}
