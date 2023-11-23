"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { H3 } from "@/components/ui/h3";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  assignmentId: string;
  groupMembersToAdd: { name: string; studentId: string }[];
  inSidebar?: boolean;
};

export function AddUserToAssignment({
  assignmentId,
  groupMembersToAdd,
  inSidebar = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setIsLoading(true);

    const newUserId = groupMembersToAdd.find(
      (obj) => obj.name.toLowerCase() === value,
    )?.studentId;

    if (newUserId) {
      const res = await fetch("/api/post-user-assignment-action", {
        method: "POST",
        body: JSON.stringify({
          assignmentId: assignmentId,
          newUserId: newUserId,
        }),
      }).catch((e) => {
        return null;
      });
      if (res) {
        const result = (await res.json()) as RegularAPIResponse<{
          isSuccess: boolean;
        }>;

        if (result.status === "error") {
          toast.error("Der skete en fejl");
        } else {
          router.refresh();
          if (result.data.isSuccess) {
            toast.success("Tilføjede elev til afleveringen!");
          } else {
            toast.error("Der skete en fejl, da dataen ikke er opdateret");
          }
          setValue("");
        }
      } else {
        toast.error("Der skete en fejl");
      }
    } else {
      toast.error("Kunne ikke hente elev");
    }

    setIsLoading(false);
  }

  const options = groupMembersToAdd.map((obj) => {
    return { label: obj.name, value: obj.name.toLowerCase() };
  });

  if (groupMembersToAdd.length === 0) return null;

  return (
    <div className="flex flex-col gap-y-2">
      {inSidebar ? (
        <H3>Tilføj medlem</H3>
      ) : (
        <p className="text-xs text-muted-foreground">TILFØJ MEDLEM</p>
      )}

      <div className="flex flex-col gap-y-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "h-auto justify-between text-xs",
                inSidebar ? "w-full" : "w-52",
              )}
            >
              <div className="flex w-full items-center text-left">
                <p className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {value
                    ? options.find((obj) => obj.value === value)?.label
                    : "Vælg..."}
                </p>
                <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Søg..." className="h-9" />
              <CommandEmpty>Intet resultat</CommandEmpty>
              <ScrollArea className="h-48 border-0">
                <CommandGroup className="border-0">
                  {options.map((obj) => (
                    <CommandItem
                      key={obj.value}
                      value={obj.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {obj.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === obj.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
        <Button
          loading={isLoading}
          onClick={handleClick}
          disabled={isLoading || value === ""}
          className={cn(
            "flex h-8 gap-x-2 px-0 py-0 text-xs",
            inSidebar ? "w-full" : "w-24",
          )}
        >
          {isLoading ? "Tilføjer.." : "Tilføj"}
        </Button>
      </div>
    </div>
  );
}
