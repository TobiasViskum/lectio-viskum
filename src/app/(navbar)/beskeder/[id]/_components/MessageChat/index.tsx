import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { ChatHeader } from "./ChatHeader";

type Props = {
  chat: MessageChat;
  originalSenderName: string;
};

export function MessageChat({ chat, originalSenderName }: Props) {
  const sender = chat.sender;
  const isSenderString = typeof sender === "string";
  const senderClassOrInitials = isSenderString
    ? sender.split(/\(|\)/)[1]
    : "initials" in sender
    ? sender.initials
    : sender.studentClass;
  const senderName = isSenderString
    ? sender.replace(/ \(.*\)/, "")
    : sender.name;
  const isOriginalSender = originalSenderName.includes(senderName);

  return (
    <div
      key={chat.content}
      className={cn(
        "flex w-full",
        isOriginalSender ? "justify-start" : "justify-end",
      )}
    >
      <div className="w-full xl:w-fit xl:min-w-[min(70%,600px)] xl:max-w-[min(80%,700px)]">
        <div
          className={cn(
            "flex items-center gap-x-2",
            isOriginalSender ? "justify-start" : "justify-end",
          )}
        >
          <Suspense
            fallback={
              <div className="grid aspect-square h-12 w-12 place-items-center rounded-full bg-accent">
                <LoadingDots className="scale-50" />
              </div>
            }
          >
            <ChatHeader
              showIfOriginalSender={true}
              isOriginalSender={isOriginalSender}
              sender={sender}
            />
          </Suspense>
          <div
            className={cn(
              "flex flex-col justify-center",
              isOriginalSender ? "items-start" : "items-end",
            )}
          >
            <p className="font-semibold">
              {isSenderString ? sender.replace(/ \(.*\)/, "") : sender.name}
            </p>
            <div className="text-sm text-muted-foreground">
              {typeof sender !== "string"
                ? "initials" in sender
                  ? sender.initials
                  : sender.studentClass
                : senderClassOrInitials}
            </div>
          </div>
          <Suspense
            fallback={
              <div className="grid aspect-square h-12 w-12 place-items-center rounded-full bg-accent">
                <LoadingDots className="scale-50" />
              </div>
            }
          >
            <ChatHeader
              showIfOriginalSender={false}
              isOriginalSender={isOriginalSender}
              sender={sender}
            />
          </Suspense>
        </div>
        <div className="mb-1 mt-3 rounded-md bg-[hsl(240,5%,64.9%)] bg-opacity-20 px-2 pb-2 pt-1">
          <p className="pb-2 text-lg font-semibold">{chat.title}</p>
          <div
            className="text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: chat.content }}
          />
        </div>
        <p
          className={cn(
            "w-full text-xs text-muted-foreground",
            isOriginalSender ? "text-right" : "text-left",
          )}
        >
          {new Intl.DateTimeFormat("da-dk", {
            dateStyle: "long",
            timeStyle: "short",
          }).format(chat.date)}
        </p>
      </div>
    </div>
  );
}
