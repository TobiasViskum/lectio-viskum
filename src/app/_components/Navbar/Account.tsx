"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  strUser: string;
};

export function Account({ strUser }: Props) {
  const user = JSON.parse(strUser) as Student | null;

  if (user === null) {
    return <p>Error</p>;
  }

  return (
    <div>
      <Avatar>
        <AvatarImage src={user.img} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
