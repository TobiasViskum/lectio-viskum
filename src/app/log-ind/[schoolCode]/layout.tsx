export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex w-full max-w-6xl justify-center">
      {children}
    </div>
  );
}
