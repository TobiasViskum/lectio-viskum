import { getMessage } from "@/api-functions/scrapeFunctions/getMessage";
import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import { H1 } from "@/components/ui/h1";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export default async function MessagePage({ params }: Props) {
  const message = await getMessage(params.id);

  if (message === null || typeof message === "string") return <p>Error</p>;

  let originalSenderName = message.chat[0].sender.name;

  return (
    <SidebarWrapper component={<p>Sidebar</p>}>
      <H1>{message.title}</H1>
      <div className="w-full space-y-10">
        {message.chat.map((chat) => {
          const senderName = chat.sender.name;
          const isOriginalSender = originalSenderName === senderName;

          return (
            <div
              key={chat.title}
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
                  {isOriginalSender && (
                    <Image
                      className="aspect-square rounded-full object-cover"
                      src={chat.sender.imgSrc}
                      alt="img"
                      width={48}
                      height={48}
                    />
                  )}
                  <div
                    className={cn(
                      "flex flex-col justify-center",
                      isOriginalSender ? "text-left" : "text-right",
                    )}
                  >
                    <p className="font-semibold">{chat.sender.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {"initials" in chat.sender
                        ? chat.sender.initials
                        : chat.sender.studentClass}
                    </p>
                  </div>
                  {!isOriginalSender && (
                    <Image
                      className="aspect-square rounded-full object-cover"
                      src={chat.sender.imgSrc}
                      alt="img"
                      width={48}
                      height={48}
                    />
                  )}
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
        })}
      </div>
    </SidebarWrapper>
  );
}
