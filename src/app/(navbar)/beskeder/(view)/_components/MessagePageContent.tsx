import { H1 } from "@/components/ui/h1";
import { Fragment } from "react";
import { Message } from "./Message";
import { Separator } from "@/components/ui/separator";

type Props = {
  title: string;
  messages: Message[];
};

export function MessagePageContent({ messages, title }: Props) {
  return (
    <>
      <H1 className="pl-2 md:pl-0">{title}</H1>
      <div>
        <div className="flex flex-col">
          {messages.map((message) => {
            return (
              <Fragment key={message.id}>
                <Message message={message} />
                <Separator className="ml-8 hidden w-[calc(100%-32px)] last:hidden [&:not(:last-child)]:block" />
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
