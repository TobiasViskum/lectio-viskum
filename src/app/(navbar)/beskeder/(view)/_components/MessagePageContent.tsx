import { H1 } from "@/components/ui/h1";
import { Fragment } from "react";
import { Message } from "./Message";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/h3";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  title: string;
  messages: Message[];
};

export function MessagePageContent({ messages, title }: Props) {
  return (
    <>
      <H1 className="pl-2 @container md:pl-0">{title}</H1>
      <div>
        <div className="flex flex-col">
          {messages.length === 0 && <H3>Der er ingen beskeder at vise</H3>}
          {/* <ScrollArea className="h-[calc(100svh-64px-48px-196px)] rounded-none border-0"> */}
          {messages.length !== 0 &&
            messages.map((message) => {
              return (
                <Fragment key={message.id}>
                  <Message message={message} />
                  <Separator className="ml-8 hidden w-[calc(100%-32px)] last:hidden [&:not(:last-child)]:block" />
                </Fragment>
              );
            })}
          {/* </ScrollArea> */}
        </div>
      </div>
    </>
  );
}
