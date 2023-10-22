import { SmallScreenSubmit } from "./SmallScreenSubmit";

type Props = { submit: Submit; isSubmitterTeacher: boolean };

export function Submit({ submit, isSubmitterTeacher }: Props) {
  return (
    <div>
      <div className="block md:hidden">
        <SmallScreenSubmit
          submit={submit}
          isSubmitterTeacher={isSubmitterTeacher}
        />
      </div>
      <div className="hidden md:block">
        <SmallScreenSubmit
          submit={submit}
          isSubmitterTeacher={isSubmitterTeacher}
        />
      </div>
    </div>
  );
}
