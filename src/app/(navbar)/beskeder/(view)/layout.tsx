import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import { H2 } from "@/components/ui/h2";
import { H3 } from "@/components/ui/h3";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function MessagesLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarWrapper
      component={
        <div>
          <H2>Menu</H2>
          <div>
            <H3>Søg</H3>
            <div className="px-1">
              <Input />
            </div>
          </div>
          <div>
            <H3>Andre beskeder</H3>
            <Link href="/beskeder/nyeste" className="link flex items-center">
              Nyeste
              <ChevronRight className="min-h-[20px] min-w-[20px]" />
            </Link>
            <Link href="/beskeder/alle" className="link flex items-center">
              Alle
              <ChevronRight className="min-h-[20px] min-w-[20px]" />
            </Link>
            <Link href="/beskeder/ulaeste" className="link flex items-center">
              Ulæste
              <ChevronRight className="min-h-[20px] min-w-[20px]" />
            </Link>
          </div>
        </div>
      }
    >
      {children}
    </SidebarWrapper>
  );
}
