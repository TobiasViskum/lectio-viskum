import { Label } from "@/components/ui/label";
import { Title } from "./_components/Title";
import { lectioAPI } from "@/lib/lectio-api";
import { Input } from "@/components/ui/input";
import { LoginForm } from "./_components/LoginForm";
import Link from "next/link";
import { ArrowLeft, Undo2 } from "lucide-react";

type Props = {
  params: {
    schoolCode: string;
  };
  searchParams: {
    name?: string;
  };
};

export default async function SchoolCodePage({ params, searchParams }: Props) {
  const promise = lectioAPI.getSchool({ schoolCode: params.schoolCode });

  return (
    <div className="relative flex w-full max-w-6xl justify-center">
      <div className="grid w-full place-items-center gap-y-8 pt-20 sm:gap-y-12">
        <Link
          href={"/log-ind"}
          className="absolute -top-8 left-0 flex items-center gap-x-2 rounded-md p-2 hover:bg-accent"
        >
          <Undo2 />
          <p>Gå tilbage</p>
        </Link>
        <Title schoolPromise={promise} name={searchParams.name} />

        <div className="flex w-full max-w-sm flex-col items-center gap-y-8">
          <Label className="text-muted-foreground">
            Log ind for at tilgå Lectio
          </Label>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
