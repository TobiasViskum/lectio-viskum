"use client";

type Props = {
  username: string;
  password: string;
  schoolCode: string;
};

export function setAuthCookies({ username, password, schoolCode }: Props) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  document.cookie = `username=${username}; expires=` + date.toUTCString() + "; path=/";
  document.cookie = `password=${password}; expires=` + date.toUTCString() + "; path=/";
  document.cookie = `schoolCode=${schoolCode}; expires=` + date.toUTCString() + "; path=/";
}
