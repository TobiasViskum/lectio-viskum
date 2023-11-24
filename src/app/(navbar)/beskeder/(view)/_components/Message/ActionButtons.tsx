"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";

type Props = {
  message: Message;
};

export function ActionButtons({ message }: Props) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="flex h-full flex-col justify-center gap-x-2 gap-y-1 lg:flex-row lg:items-center lg:justify-start"
      id="iconsHolder"
    >
      <Checkbox className="m-0.5 h-4 w-4" onClick={(e) => {}} />
      <button className="h-5 w-5 text-orange-500">
        {message.isFavorite ? (
          <StarFilledIcon className="h-full w-full" />
        ) : (
          <StarIcon className="h-full w-full" />
        )}
      </button>
    </div>
  );
}
