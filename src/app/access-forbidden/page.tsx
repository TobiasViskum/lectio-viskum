import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function AccessForbidden() {
  async function handleSubmit() {
    "use server";
    revalidatePath("/forside");
    redirect("/forside");
  }

  return (
    <div className="grid w-full place-items-center text-center [text-wrap:balance]">
      <h1 className="text-4xl font-semibold text-red-400">
        For mange requests
      </h1>
      <p className="py-8 text-muted-foreground">
        Der blev sendt for mange requests til Lectio inden for en kort periode.
        Om få minutter vil du få adgang igen
      </p>
      <form action={handleSubmit}>
        <Button type="submit">Prøv igen</Button>
      </form>
    </div>
  );
}
