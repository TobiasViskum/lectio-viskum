"use client";

import { Student } from "@/components/global/Student";
import { Teacher } from "@/components/global/Teacher";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Content({ lesson }: { lesson: FullLesson }) {
  const [search, setSearch] = useState("");

  let q = search.toLowerCase();

  const teachers = [...lesson.teachers].filter((teacher) => {
    if (q === "") return true;

    return (
      teacher.name.toLowerCase().includes(q) ||
      teacher.initials.toLowerCase().includes(q) ||
      teacher.teacherId.toLowerCase().includes(q)
    );
  });
  const students = [...lesson.students].filter((student) => {
    if (q === "") return true;

    return (
      student.name.toLowerCase().includes(q) ||
      student.studentClass.toLowerCase().includes(q) ||
      student.studentId.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="flex flex-col gap-y-2 py-2 pb-4 pl-1 pr-3">
        <p className="text-sm text-muted-foreground">
          Søg efter elever eller lærere:
        </p>
        <Input
          placeholder="Søg..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ScrollArea className="h-[calc(100%-88px)] w-full border-0">
        <div
          className={cn(
            "h-full flex-col gap-y-2 pb-4",
            teachers.length === 0 ? "hidden" : "flex",
          )}
        >
          <Badge className="w-max text-muted-foreground" variant={"secondary"}>
            Lærere:
          </Badge>
          <div className="flex flex-col gap-y-2 pr-3">
            {teachers.map((teacher) => {
              return (
                <div key={teacher.teacherId}>
                  <Teacher teacher={teacher} size="small" />
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={cn(
            "h-full flex-col gap-y-2",
            students.length === 0 ? "hidden" : "flex",
          )}
        >
          <Badge className="w-max text-muted-foreground" variant={"secondary"}>
            Elever:
          </Badge>

          <div className="flex flex-col gap-y-2 pr-3">
            {students.map((student) => {
              return (
                <div key={student.studentId}>
                  <Student linkToSchedule student={student} size="small" />
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
