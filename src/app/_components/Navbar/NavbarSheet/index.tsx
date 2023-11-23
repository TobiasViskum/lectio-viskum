import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { NavbarSheetHeader } from "./NavbarSheetHeader";
import { Separator } from "@/components/ui/separator";
import { HomeIcon2 } from "@/components/icons/HomeIcon";
import Link from "next/link";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getWeekAndYear } from "@/util/getWeekAndYear";
import {
  BookmarkIcon,
  CalendarIcon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";

export function NavbarSheet() {
  const lectioProps = getLectioProps();
  const { week, year } = getWeekAndYear(new Date());

  return (
    <div className="flex items-center 2xl:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <MenuIcon />
          </button>
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col gap-y-4">
          <NavbarSheetHeader />
          <Separator />
          <div className="flex flex-col gap-y-2">
            {/* <SheetClose asChild> */}
            <Link
              role="link"
              href={"/forside"}
              className="s flex items-center gap-x-2 rounded-md px-3 py-1.5 hover:bg-accent"
            >
              <HomeIcon2 className="h-5 w-5" />
              <p className="text-lg">Forside</p>
            </Link>
            {/* </SheetClose> */}

            {/* <SheetClose asChild> */}
            <Link
              role="link"
              href={`/skema/elev/${lectioProps.userId}/${week}-${year}`}
              className="s flex items-center gap-x-2 rounded-md px-3 py-1.5 hover:bg-accent"
            >
              <CalendarIcon className="h-5 w-5" />
              <p className="text-lg">Skema</p>
            </Link>
            {/* </SheetClose> */}

            {/* <SheetClose asChild> */}
            <Link
              role="link"
              href={"/afleveringer"}
              className="s flex items-center gap-x-2 rounded-md px-3 py-1.5 hover:bg-accent"
            >
              <PaperPlaneIcon className="h-5 w-5 -rotate-45" />
              <p className="text-lg">Afleveringer</p>
            </Link>
            {/* </SheetClose> */}

            {/* <SheetClose asChild> */}
            <Link
              role="link"
              href={"/lektier"}
              className="s flex items-center gap-x-2 rounded-md px-2 py-1.5 hover:bg-accent"
            >
              <BookmarkIcon className="h-6 w-6" />
              <p className="text-lg">Lektier</p>
            </Link>
            {/* </SheetClose> */}

            <Link
              role="link"
              href={"/beskeder/nyeste"}
              className="s flex items-center gap-x-2 rounded-md px-3 py-1.5 hover:bg-accent"
            >
              <EnvelopeClosedIcon className="h-5 w-5" />
              <p className="text-lg">Beskeder</p>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
