"use client";

type Props = { children: React.ReactNode };
export function Wrapper({ children }: Props) {
  return <div className="flex h-full transition-transform">{children}</div>;
}
