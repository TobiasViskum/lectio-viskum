"use client";

import { LoadingSpinner } from "@/components/loading-components/LoadingSpinner";
import { Checkbox } from "@/components/ui/checkbox";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  message: Message;
};

export function ActionButtons({ message }: Props) {
  const [isPostingFavorite, setIsPostingFavorite] = useState(false);
  const router = useRouter();

  async function handleFavorite() {
    setIsPostingFavorite(true);

    const res = (await fetch("/api/post-favorite-message", {
      method: "POST",
      body: JSON.stringify({
        messageId: message.id,
        doDelete: message.isFavorite,
      }),
    }).then(async (r) => await r.json())) as NoDataAPIResponse;

    if (res.status === "error") {
      toast.error("Det skete en fejl");
    } else {
      if (message.isFavorite) {
        toast.success("Fjernede besked fra favoritter");
      } else {
        toast.success("Tilføjede besked til favoritter", {
          action: {
            label: "Se",
            onClick: () => router.push("/beskeder/favoritter"),
          },
        });
      }
      router.refresh();
    }

    setTimeout(() => {
      setIsPostingFavorite(false);
    }, 250);
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="flex h-full flex-col justify-center gap-x-2 gap-y-1 lg:flex-row lg:items-center lg:justify-start"
      id="iconsHolder"
    >
      <Checkbox className="m-0.5 h-4 w-4" onClick={(e) => {}} disabled />
      <button
        className="grid h-5 w-5 place-items-center text-orange-500"
        onClick={handleFavorite}
      >
        {isPostingFavorite ? (
          <LoadingSpinner className="h-4 w-4" />
        ) : message.isFavorite ? (
          <StarFilledIcon className="h-full w-full" />
        ) : (
          <StarIcon className="h-full w-full" />
        )}
      </button>
    </div>
  );
}
