import { getMessageSender } from "@/api-functions/scrapeFunctions/getMessageSender";
import { profile } from "@/assets";
import { LoadingDots } from "@/components/loading-components/LoadingDots";
import Image from "next/image";

type Props = {
  sender: string | Student | Teacher;
  isOriginalSender: boolean;
  showIfOriginalSender: boolean;
};

export async function ChatHeader({
  sender,
  isOriginalSender,
  showIfOriginalSender,
}: Props) {
  if (showIfOriginalSender && !isOriginalSender) return null;
  if (!showIfOriginalSender && isOriginalSender) return null;

  const isSenderString = typeof sender === "string";

  let actualSender = { name: "", imgUrl: "", imgSrc: "" } as Student | Teacher;

  if (isSenderString) {
    const newSender = await getMessageSender(sender);

    if (newSender) {
      actualSender = newSender;
    }
  } else {
    actualSender = sender;
  }

  return (
    <>
      <Image
        className="aspect-square rounded-full object-cover"
        src={actualSender.imgSrc || profile}
        alt="img"
        width={48}
        height={48}
      />
    </>
  );
}
