import { H1 } from "@/components/ui/h1";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function MessagesPage() {
  redirect("/beskeder/nyeste");

  return (
    <div>
      <H1>Beskeder</H1>
      <div>
        <p>Vælg beskedtype:</p>
        <Link href={"/beskeder/nyeste"} className="link">
          Nyeste
        </Link>
      </div>
    </div>
  );
}
