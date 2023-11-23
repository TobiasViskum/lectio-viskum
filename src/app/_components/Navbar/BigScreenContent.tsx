import { Logo } from "@/assets";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { getWeekAndYear } from "@/util/getWeekAndYear";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BigScreenContent() {
  const lectioProps = getLectioProps();
  const { week, year } = getWeekAndYear(new Date());

  return (
    <div className="hidden gap-x-4 2xl:flex">
      <div>
        <Link href={"/forside"} className="aspect-[3.375_/_1] h-8">
          <Image
            src={Logo}
            alt="logo"
            height={32}
            width={108}
            className="aspect-[3.375_/_1]"
          />
        </Link>
      </div>
      <div>
        <Link
          href={`/skema/elev/${lectioProps.userId}/${week}-${year}`}
          className="flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-semibold hover:bg-accent"
        >
          Skema
          <CalendarIcon />
        </Link>
      </div>
      <div>
        <Link
          href={"/afleveringer"}
          className="flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-semibold hover:bg-accent"
        >
          Afleveringer
          <PaperPlaneIcon className="-rotate-45" />
        </Link>
      </div>
      <div>
        <Link
          href={"/lektier"}
          className="flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-semibold hover:bg-accent"
        >
          Lektier
          <BookmarkIcon className="h-5 w-5" />
        </Link>
      </div>
      <div>
        <Link
          href={"/beskeder/beskeder"}
          className="flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-semibold hover:bg-accent"
        >
          Beskeder
          <EnvelopeClosedIcon />
        </Link>
      </div>
    </div>
  );
}
