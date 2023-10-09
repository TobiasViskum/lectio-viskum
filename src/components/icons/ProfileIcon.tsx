import { cn } from "@/lib/utils";

type Props = { className?: string };

export function ProfileIcon({ className }: Props) {
  return (
    <svg version="1.0" className={cn("fill-foreground h-8 w-8", className)} viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none"></g>
    </svg>
  );
}
