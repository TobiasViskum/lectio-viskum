import { getMessages } from "@/api-functions/scrapeFunctions";
import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { H1 } from "@/components/ui/h1";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Fragment } from "react";

export default async function Messages() {
  const messages = await getMessages({ type: "newest" });

  if (messages === null || typeof messages === "string") return <p>Error</p>;

  return (
    <SidebarWrapper component={<p>Sidebar</p>}>
      <H1 className="pl-2 md:pl-0">Nyeste beskeder</H1>
      <div>
        <div className="flex flex-col">
          {messages.map((message) => {
            return (
              <Fragment key={message.id}>
                <div
                  role="button"
                  tabIndex={0}
                  className="group flex items-start justify-start pb-2 pt-2 text-left first:pt-0 md:items-center"
                >
                  <div className="mt-1 grid h-8 w-8 place-items-center">
                    {message.isUnread && (
                      <div className="h-3 w-3 rounded-full bg-blue-400" />
                    )}
                  </div>
                  <div className="flex h-full w-full rounded-md group-[:hover:not(:has(#checkbox:hover))]:bg-accent group-[:hover:not(:has(#favorite:hover))]:bg-accent">
                    <div className="md:item flex aspect-square h-fit w-fit flex-col place-items-center justify-center gap-2 p-1 md:flex-row">
                      <Checkbox id="checkbox" className="hover:data" />
                      <StarIcon
                        id="favorite"
                        className="h-6 w-6 p-0.5 text-orange-500"
                      />
                    </div>
                    <div className="flex flex-col gap-x-10 py-1 pl-2 md:flex-row">
                      <p
                        className={cn(
                          "mb-auto mt-auto w-80 items-center overflow-x-hidden text-ellipsis whitespace-nowrap text-justify text-sm md:w-44",
                          message.isUnread
                            ? "font-extrabold text-foreground"
                            : "font-bold text-muted-foreground",
                        )}
                      >
                        {message.sender}
                      </p>
                      <p
                        className={cn(
                          "flex items-center text-sm",
                          message.isUnread
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {message.title}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator className="ml-8 hidden w-[calc(100%-32px)] last:hidden [&:not(:last-child)]:block" />
              </Fragment>
            );
          })}
        </div>
      </div>
    </SidebarWrapper>
  );
}
