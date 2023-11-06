import { SmartNavigation } from "@/app/_components/SmartNavigation";

export default function NoSidebarLayot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmartNavigation />
      {children}
    </>
  );
}
