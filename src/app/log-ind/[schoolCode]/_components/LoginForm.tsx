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

        const res = await handleLogin({ username: username, password: password, schoolCode: params.schoolCode });
        if (res.status === "error") {
          toast.error(res.message);
        } else if (res.data === null) {
          toast.error(res.message);
        } else if (res.data.isAuthenticated) {
          setAuthCookies({
            username: username,
            password: password,
            schoolCode: params.schoolCode,
          });
          router.refresh();
          router.push("/");
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
            className="border-0 focus-visible:ring-0 placeholder:opacity-50 rounded-none"
            placeholder="Brugernavn"
            name="username"
            onKeyDown={(e) => {
              if (e.key === "Enter" && passwordRef.current) {
                passwordRef.current.focus();
              }
            }}
          />
        </div>
        <div className="border-b w-full flex">
          <Input
            ref={passwordRef}
            spellCheck={false}
            className="border-0 focus-visible:ring-0 placeholder:opacity-50 rounded-none"
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
            className="h-9 w-9 top-0 grid place-items-center p-1.5"
            onClick={() => {
              setIsShowingPassword((prev) => !prev);
            }}
          >
            {isShowingPassword ? (
              <EyeIcon
                className="w-full h-full"
                onClick={() => {
                  setIsShowingPassword(false);
                }}
              />
            ) : (
              <EyeOffIcon
                className="w-full h-full"
                onClick={() => {
                  setIsShowingPassword(true);
                }}
              />
            )}
          </button>
        </div>
        <Button loading={isSubmitting} disabled={isSubmitting} className="mt-2 gap-x-2" ref={submitRef} onClick={handleSubmit}>
          {isSubmitting ? "Logger dig ind..." : "Log ind"}
        </Button>
      </div>
    </>
  );
}
