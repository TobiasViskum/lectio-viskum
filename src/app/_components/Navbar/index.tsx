import { Logo } from "@/assets";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, HomeIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "./Menu";

export function Navbar() {
  return (
    <div className="fixed h-16 w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <nav className="h-full flex items-center px-4 gap-x-4 sm:px-8">
        <Link href={"/"} className="aspect-[3.375_/_1] h-8">
          <Image src={Logo} alt="LectioV" height={32} width={108} className="aspect-[3.375_/_1]" />
        </Link>
        <Button variant={"ghost"} className="flex gap-x-2 items-center ml-4">
          <Link className="font-semibold " href={"/skema"}>
            Skema
          </Link>
          <CalendarIcon />
        </Button>
        <Menu />
        <Link href={"/login"}>Login</Link>
      </nav>
      <Separator />
    </div>
  );
}
