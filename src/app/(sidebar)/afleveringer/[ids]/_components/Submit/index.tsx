import { SmallScreenSubmit } from "./SmallScreenSubmit";

type Props = { submit: Submit };

export function Submit({ submit }: Props) {
  return (
    <div>
      <div className="block md:hidden">
        <SmallScreenSubmit submit={submit} />
      </div>
      <div className="hidden md:block">
        <SmallScreenSubmit submit={submit} />
      </div>
    </div>
  );
}
