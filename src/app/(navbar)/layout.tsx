import { Suspense } from "react";
import { Navbar } from "../_components/Navbar";
import { SmartNavigation } from "../_components/SmartNavigation";

type Props = { children: React.ReactNode };

export default function NavbarScreen({ children }: Props) {
  return (
    <>
      <Navbar />
      {/* <Suspense>
        <SmartNavigation />
      </Suspense> */}
      {children}
    </>
  );
}
