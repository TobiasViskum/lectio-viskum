"use client";

type Props = { children: React.ReactNode };
export function Wrapper({ children }: Props) {
  return (
    <div className="relative transition-transform flex translate-x-[calc((var(--lesson-width)+12px)*(0))]" style={{ columnGap: "calc(1px + var(--lesson-gap))" }}>
      {children}
    </div>
  );
}
