import { SmartNavigation } from "@/app/_components/SmartNavigation";
import { Suspense } from "react";

export default function NoSidebarLayot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <SmartNavigation />
      </Suspense>
      {children}
    </>
  );
}
