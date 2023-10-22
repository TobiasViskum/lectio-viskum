"use client";

type Props = { children: React.ReactNode };
export function Wrapper({ children }: Props) {
  return (
    <div
      className="relative flex translate-x-[calc((var(--lesson-width)+12px)*(0))] transition-transform"
      style={{ columnGap: "calc(1px + var(--lesson-gap))" }}
    >
      {children}
    </div>
  );
}
