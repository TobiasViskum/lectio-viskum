"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { handleLogin } from "../_actions/handleLogin";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export function LoginForm() {
  const params: { schoolCode: string } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  async function handleSubmit() {
    setIsSubmitting(true);
    await handleLogin({ username: "", password: "", schoolCode: "" });

    setTimeout(async () => {
      if (usernameRef.current && passwordRef.current) {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (username === "") {
          toast.error("Indtast dit brugernavn");
          setIsSubmitting(false);
          return;
        }
        if (password === "") {
          toast.error("Indtast din adgangskode");
          setIsSubmitting(false);
          return;
        }

        const res = await handleLogin({ username: username, password: password, schoolCode: params.schoolCode });
        if (res.status === "error") {
          toast.error(res.message);
        } else if (res.data === null) {
          toast.error(res.message);
        } else if (res.data.isAuthenticated) {
          toast.success("Loggede dig ind!");
        } else {
          toast.error("Elev findes ikke");
        }
      } else {
        toast.error("En uventet fejl skete");
      }
      setIsSubmitting(false);
    }, 500);
  }

  return (
    <>
      <div className="w-full flex flex-col gap-y-6">
        <div className="border-b w-full">
          <Input
            ref={usernameRef}
            spellCheck={false}
            className="border-0 focus-visible:ring-0 placeholder:opacity-50"
            placeholder="Brugernavn"
            name="username"
            onKeyDown={(e) => {
              if (e.key === "Enter" && passwordRef.current) {
                passwordRef.current.focus();
              }
            }}
          />
        </div>
        <div className="border-b w-full relative">
          <Input
            ref={passwordRef}
            spellCheck={false}
            className="border-0 focus-visible:ring-0 placeholder:opacity-50"
            placeholder="Adgangskode"
            type="password"
            name="password"
            onKeyDown={(e) => {
              if (e.key === "Enter" && submitRef.current) {
                submitRef.current.click();
              }
            }}
          />
        </div>
        <Button loading={isSubmitting} disabled={isSubmitting} className="mt-2 gap-x-2" ref={submitRef} onClick={handleSubmit}>
          {isSubmitting ? "Logger ind..." : "Log ind"}
        </Button>
      </div>
    </>
  );
}
