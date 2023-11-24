import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { ActionButtons } from "./ActionButtons";
import Link from "next/link";

type Props = {
  message: Message;
};

export function Message({ message }: Props) {
  return (
    <div className="group flex items-start justify-start pb-2 pt-2 first:pt-0 lg:items-center">
      <div className="mt-1 grid h-8 w-8 place-items-center">
        {message.isUnread && (
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-400" />
        )}
      </div>
      <Link
        href={`/beskeder/${message.id}`}
        className="flex min-h-[60px] w-full items-center gap-x-2 rounded-md px-2 py-2 transition-colors @container lg:min-h-[48px] xl:gap-x-6 [&:hover:not(:has(#iconsHolder:hover))]:bg-accent"
      >
        <ActionButtons message={message} />
        <div className="flex flex-col items-start gap-y-1.5 text-left lg:flex-row lg:items-center">
          <p
            className={cn(
              "items-center overflow-x-hidden text-ellipsis whitespace-nowrap text-sm ",
              "w-[min(60cqw,400px)] [@media(min-width:1024px)]:w-[min(30cqw,300px)]",
              message.isUnread
                ? "font-extrabold text-foreground"
                : "font-bold text-muted-foreground",
            )}
          >
            {message.sender}
          </p>
          <p
            className={cn(
              "w-[min(60cqw,400px)] overflow-x-hidden text-ellipsis whitespace-nowrap text-sm lg:pl-4 [@media(min-width:1024px)]:w-[min(50cqw,400px)]",
              message.isUnread ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {message.title}
          </p>
        </div>

        <div
          className={cn(
            "ml-auto flex min-w-[86px] items-center justify-end text-muted-foreground",
            message.isUnread ? "opacity-90" : "opacity-50",
          )}
        >
          <p className="w-max text-xs">{message.latestChange}</p>
          <ChevronRight className="h-5 min-h-[20px] w-5 min-w-[20px] transition-transform group-hover:translate-x-1 group-hover:scale-110" />
        </div>
      </Link>
    </div>
  );
}
