import { getMessages } from "@/api-functions/scrapeFunctions";
import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { H1 } from "@/components/ui/h1";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";
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
                <div className="group flex items-start justify-start pb-2 pt-2 first:pt-0 lg:items-center">
                  <div className="mt-1 grid h-8 w-8 place-items-center">
                    {message.isUnread && (
                      <div className="h-3 w-3 animate-bounce rounded-full bg-blue-400" />
                    )}
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    className="flex min-h-[60px] w-full items-center gap-x-2 rounded-md px-2 py-2 transition-colors @container lg:min-h-[48px] xl:gap-x-6 [&:hover:not(:has(#iconsHolder:hover))]:bg-accent"
                  >
                    <div
                      className="flex h-full flex-col justify-center gap-x-2 gap-y-1 lg:flex-row lg:items-center lg:justify-start"
                      id="iconsHolder"
                    >
                      <Checkbox className="m-0.5 h-4 w-4" />
                      <StarIcon className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex flex-col items-start gap-y-1.5 text-left lg:flex-row lg:items-center">
                      <p
                        className={cn(
                          "items-center overflow-x-hidden text-ellipsis whitespace-nowrap text-sm ",
                          "w-[min(70cqw,400px)] [@media(min-width:1024px)]:w-[min(30cqw,300px)]",
                          message.isUnread
                            ? "font-extrabold text-foreground"
                            : "font-bold text-muted-foreground",
                        )}
                      >
                        {message.sender}
                      </p>
                      <p
                        className={cn(
                          "w-[min(70cqw,400px)] overflow-x-hidden text-ellipsis whitespace-nowrap text-sm lg:pl-4 [@media(min-width:1024px)]:w-[min(50cqw,400px)]",
                          message.isUnread
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {message.title}
                      </p>
                    </div>

                    <div
                      className={cn(
                        "ml-auto flex items-center justify-end text-muted-foreground",
                        message.isUnread ? "opacity-90" : "opacity-50",
                      )}
                    >
                      <p className="w-max text-xs">{message.latestChange}</p>
                      <ChevronRight className="h-5 min-h-[20px] w-5 min-w-[20px] transition-transform group-hover:translate-x-1 group-hover:scale-110" />
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
