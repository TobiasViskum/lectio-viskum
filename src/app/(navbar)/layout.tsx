import { Navbar } from "../_components/Navbar";

type Props = { children: React.ReactNode };

export default function NavbarScreen({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
