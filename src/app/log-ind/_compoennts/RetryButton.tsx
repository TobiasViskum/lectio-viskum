"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function RetryButton() {
  const router = useRouter();

  return (
    <Link href="/log-ind">
      <Button>Retry</Button>
    </Link>
  );
}
