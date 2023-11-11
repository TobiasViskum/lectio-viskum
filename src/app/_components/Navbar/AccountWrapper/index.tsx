import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";
import Image from "next/image";
import { profile } from "@/assets";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Settings, StretchHorizontal } from "lucide-react";
import { LogOutButton } from "./LogOutButton";

export async function AccountWrapper() {
  const userId = getLectioProps().userId;

  const user = await lectioAPI.getStudent.byId({
    userId: userId,
  });

  return (
    <Menubar className="border-0 bg-transparent px-0 py-0">
      <MenubarMenu>
        <MenubarTrigger asChild className="cursor-pointer">
          <Button variant={"ghost"} className="flex h-12 gap-x-2 px-2">
            <Image
              src={user?.imgSrc || profile}
              width={40}
              height={40}
              alt="img"
              className="ml-1 aspect-square h-10 w-10 rounded-full object-cover"
            />
            <ChevronDown className="text-muted-foreground" />
          </Button>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="flex flex-col items-start">
            <p className="text-base font-bold">{user?.name}</p>
            <p className="text-sm text-muted-foreground">
              {user?.studentClass}
            </p>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-x-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <p className="text-muted-foreground">Indstillinger</p>
          </MenubarItem>
          <MenubarItem className="flex gap-x-2">
            <StretchHorizontal className="h-5 w-5 text-muted-foreground" />
            <p className="text-muted-foreground">Håndtér cache</p>
          </MenubarItem>
          <MenubarSeparator />
          <LogOutButton />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
