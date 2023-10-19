"use client";

import { cn } from "@/lib/utils";
import { getColors } from "../_util/getColors";
import { getFormattedDate } from "../_util/getFormattedDate";
import { useEffect, useState } from "react";
import { vEvent } from "@/lib/viskum/vEvent";

type Props = { assignment: Assignment };

export function FormattedDate({ assignment }: Props) {
  const { dateColor } = getColors(assignment);

  const [formattedDate, setFormattedDate] = useState(getFormattedDate(assignment));

  useEffect(() => {
    vEvent.listen("assignmentsDateUpdate", () => {
      setFormattedDate(getFormattedDate(assignment));
    });
  }, []);

  return <p className={cn("opacity-75 text-sm", dateColor)}>{formattedDate}</p>;
}
