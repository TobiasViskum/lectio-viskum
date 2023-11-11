import { BlueBlur } from "./_compoennts/BlueBlur";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlueBlur />
      {children}
    </>
  );
}
