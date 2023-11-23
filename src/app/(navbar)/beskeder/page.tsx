import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import { H1 } from "@/components/ui/h1";
import Link from "next/link";

export default function MessagesPage() {
  return (
    <SidebarWrapper component={<p></p>}>
      <H1>Beskeder</H1>
      <div>
        <p>Vælg beskedtype:</p>
        <Link href={"/beskeder/nyeste"} className="text-link hover:underline">
          Nyeste
        </Link>
      </div>
    </SidebarWrapper>
  );
}
