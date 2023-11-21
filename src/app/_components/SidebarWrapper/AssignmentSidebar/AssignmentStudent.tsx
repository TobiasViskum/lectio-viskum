"use client";

import { profile } from "@/assets";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  student: Student & { isRemovable: boolean };
  assignmentId: string;
  deleteIndex: number;
  firstStudentIdInList: string;
};

export function AssignmentStudent({
  student,
  assignmentId,
  deleteIndex,
  firstStudentIdInList,
}: Props) {
  const [isRemovingUser, setIsRemovingUser] = useState(false);
  const router = useRouter();
  async function handleRemoveUser() {
    setIsRemovingUser(true);
    const res = await fetch(
      `/api/post-user-assignment-action?deleteIndex=${deleteIndex}`,
      {
        method: "POST",
        body: JSON.stringify({
          assignmentId: assignmentId,
          newUserId: firstStudentIdInList,
        }),
      },
    ).catch(() => null);

    if (res) {
      const result = (await res.json()) as RegularAPIResponse<{
        isSuccess: boolean;
      }>;

      if (result.status === "error") {
        toast.error("Der skete en fejl");
      } else {
        router.refresh();
        if (result.data.isSuccess) {
          toast.success("Fjernede elev fra afleveringen!");
        } else {
          toast.error("Der skete en fejl, da dataen ikke er opdateret");
        }
      }
    } else {
      toast.error("Der skete en fejl");
    }

    setIsRemovingUser(false);
  }

  return (
    <div
      role="button"
      key={student.studentId}
      tabIndex={0}
      className={cn(
        "flex cursor-pointer items-center gap-x-2 rounded-md py-2 pl-1 text-base transition-colors [&:hover:not(:has(#close:hover))]:hover:bg-accent",
        student.isRemovable ? "pr-3" : "pr-3",
      )}
    >
      <Image
        src={student.imgSrc || profile}
        width={48}
        height={48}
        alt="img"
        className="obj aspect-square rounded-full object-cover"
      />
      <div className="flex flex-col overflow-hidden text-start">
        <p className={cn("line-clamp-2 break-words font-semibold")}>
          {student.name}
        </p>
      </div>
      {student.isRemovable && (
        <Button
          onClick={handleRemoveUser}
          loading={isRemovingUser}
          id="close"
          variant={"ghost"}
          className={cn(
            "group aspect-square h-8 w-8 rounded-sm bg-transparent p-0 text-xs text-foreground transition-colors",
            isRemovingUser ? "bg-red-500" : "hover:bg-red-500",
          )}
        >
          {!isRemovingUser && (
            <X className="text-red-500 transition-colors group-hover:text-foreground" />
          )}
        </Button>
      )}
    </div>
  );
}
