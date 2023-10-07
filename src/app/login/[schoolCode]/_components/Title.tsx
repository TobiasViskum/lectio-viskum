import { lectioAPI } from "@/lib/lectio-api";
import { cn } from "@/lib/utils";

type Props = {
  schoolCode: string;
};

export async function Title({ schoolCode }: Props) {
  const titleTw = "sm:text-4xl text-3xl leading-snug font-semibold flex flex-col [text-wrap:balance] text-center";

  const school = await lectioAPI.getSchool({ schoolCode: schoolCode });

  if (school === null) return <p className={cn(titleTw, "text-red-400")}>Error</p>;

  return (
    <>
      <h1 className={titleTw}>{school.name}</h1>
    </>
  );
}
