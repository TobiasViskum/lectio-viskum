"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { handleLogin } from "../_actions/handleLogin";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { setAuthCookies } from "@/lib/auth/setAuthCookies";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function LoginForm() {
  const params: { schoolCode: string } = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);

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

        const res = await handleLogin({
          username: username,
          password: password,
          schoolCode: params.schoolCode,
        });

        if (res === null) {
          toast.error("Der skete en fejl");
        } else if (res.isAuthenticated) {
          setAuthCookies({
            username: username,
            password: password,
            schoolCode: params.schoolCode,
            lectioCookies: res.lectioCookies,
            userId: res.studentId,
          });
          router.refresh();
          toast.success("Loggede dig ind!");
          setTimeout(() => {
            router.push("/forside");
          }, 500);
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
      <div className="flex w-full flex-col gap-y-6">
        <div className="w-full border-b">
          <Input
            ref={usernameRef}
            spellCheck={false}
            className="rounded-none border-0 placeholder:opacity-50 focus-visible:ring-0"
            placeholder="Brugernavn"
            name="username"
            onKeyDown={(e) => {
              if (e.key === "Enter" && passwordRef.current) {
                passwordRef.current.focus();
              }
            }}
          />
        </div>
        <div className="flex w-full border-b">
          <Input
            ref={passwordRef}
            spellCheck={false}
            className="rounded-none border-0 placeholder:opacity-50 focus-visible:ring-0"
            placeholder="Adgangskode"
            type={isShowingPassword ? "text" : "password"}
            name="password"
            onKeyDown={(e) => {
              if (e.key === "Enter" && submitRef.current) {
                submitRef.current.click();
              }
            }}
          />
          <button
            className="top-0 grid h-9 w-9 place-items-center p-1.5"
            onClick={() => {
              setIsShowingPassword((prev) => !prev);
            }}
          >
            {isShowingPassword ? (
              <EyeIcon
                className="h-full w-full"
                onClick={() => {
                  setIsShowingPassword(true);
                }}
              />
            ) : (
              <EyeOffIcon
                className="h-full w-full"
                onClick={() => {
                  setIsShowingPassword(false);
                }}
              />
            )}
          </button>
        </div>
        <Button
          disableAnimation
          loading={isSubmitting}
          disabled={isSubmitting}
          className="mt-2 gap-x-2"
          ref={submitRef}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Logger dig ind..." : "Log ind"}
        </Button>
      </div>
    </>
  );
}
