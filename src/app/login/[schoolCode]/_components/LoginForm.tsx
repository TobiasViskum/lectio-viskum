"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function LoginForm() {
  const [formResponse, setFormResponse] = useState<FormResponse>({ status: "idle", message: "" });

  return (
    <>
      <form className="w-full flex flex-col gap-y-6">
        <div className="border-b w-full">
          <Input spellCheck={false} className="border-0 focus-visible:ring-0 placeholder:opacity-50" placeholder="Brugernavn" name="username" />
        </div>
        <div className="border-b w-full relative">
          <Input spellCheck={false} className="border-0 focus-visible:ring-0 placeholder:opacity-50" placeholder="Adgangskode" type="password" name="password" />
        </div>
        <Button type="submit">Log ind</Button>
      </form>
    </>
  );
}
