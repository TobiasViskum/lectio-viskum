import { getMessage } from "@/api-functions/scrapeFunctions/getMessage";
import { SidebarWrapper } from "@/app/_components/SidebarWrapper";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import { LoadingSpinner } from "@/components/loading-components/LoadingSpinner";
import { H1 } from "@/components/ui/h1";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MessageChat } from "./_components/MessageChat";

type Props = {
  params: {
    id: string;
  };
};

export default async function MessagePage({ params }: Props) {
  const message = await getMessage(params.id);

  if (message === null || typeof message === "string") return <p>Error</p>;

  const firstSender = message.chat[0].sender;
  let originalSenderName =
    typeof firstSender === "string" ? firstSender : firstSender.name;

  return (
    <SidebarWrapper component={<p>Sidebar</p>}>
      <H1>{message.title}</H1>
      <div className="border-l border-l-foreground pl-2 text-sm text-muted-foreground">
        <p className="font-bold text-secondary-foreground">Modtagere:</p>
        <p>{message.receivers}</p>
      </div>
      <div className="w-full space-y-10">
        {message.chat.map((chat) => (
          <MessageChat
            key={chat.content}
            chat={chat}
            originalSenderName={originalSenderName}
          />
        ))}
      </div>
    </SidebarWrapper>
  );
}
