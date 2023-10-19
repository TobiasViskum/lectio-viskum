import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContentSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h3 className="text-accent">Filtre:</h3>
        <Input
          disabled
          placeholder="Search..."
          className="placeholder-accent"
        />
      </div>
      <div className="flex flex-col gap-y-5 px-2">
        <div className="group flex w-full items-center justify-between">
          <div className="flex justify-center gap-x-2">
            <Checkbox disabled className="border-accent" />
            <Label className="text-accent">Alle</Label>
          </div>
          <Label className="text-accent">(0)</Label>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex justify-center gap-x-2">
            <Checkbox disabled className="border-accent" />
            <Label className="text-accent">Afleveret</Label>
          </div>
          <Label className="text-accent">(0)</Label>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex justify-center gap-x-2">
            <Checkbox disabled className="border-accent" />
            <Label className="text-accent">Venter</Label>
          </div>
          <Label className="text-accent">(0)</Label>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex justify-center gap-x-2">
            <Checkbox disabled className="border-accent" />
            <Label className="text-accent">Mangler</Label>
          </div>
          <Label className="text-accent">(0)</Label>
        </div>
      </div>
    </div>
  );
}
