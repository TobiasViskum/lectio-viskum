import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccessForbidden() {
  return (
    <div className="grid w-full place-items-center text-center [text-wrap:balance]">
      <h1 className="text-4xl font-semibold text-red-400">
        For mange requests
      </h1>
      <p className="py-8 text-muted-foreground">
        Der blev sendt for mange requests til Lectio inden for en kort periode.
        Om få minutter vil du få adgang igen
      </p>
      <Link href={"/forside"}>
        <Button>Prøv igen</Button>
      </Link>
    </div>
  );
}
