import { Student } from "@/components/global/Student";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getLectioProps } from "@/lib/auth/getLectioProps";
import { lectioAPI } from "@/lib/lectio-api";

export async function NavbarSheetHeader() {
  const userId = getLectioProps().userId;

  const student = await lectioAPI.getStudent.byId({
    userId: userId,
  });

  if (student === null) {
    return <p>Skeleton</p>;
  }

  return (
    <SheetHeader>
      <SheetTitle>Lectio menu</SheetTitle>
      <Student student={student} disableHover />
    </SheetHeader>
  );
}
