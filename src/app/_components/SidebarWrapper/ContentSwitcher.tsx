"use client";

import { usePathname } from "next/navigation";

type Props = {
  assignmentsSidebar: JSX.Element;
  lessonSidebar: JSX.Element;
};

export function ContentSwitcher({ assignmentsSidebar, lessonSidebar }: Props) {
  const path = usePathname();

  if (path.includes("/elevfeedback")) {
  } else if (path.includes("/skema/elev/")) {
    return lessonSidebar;
  } else if (path.includes("/afleveringer/")) {
  } else if (path.includes("/afleveringer")) {
    return assignmentsSidebar;
  }
  return null;
}
