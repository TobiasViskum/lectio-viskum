"use client";

type Props = {
  username: string;
  password: string;
  schoolCode: string;
  lectioCookies: string;
  userId: string;
};

export function setAuthCookies({
  username,
  password,
  schoolCode,
  lectioCookies,
  userId,
}: Props) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  document.cookie =
    `username=${username}; expires=` + date.toUTCString() + "; path=/";
  document.cookie =
    `password=${password}; expires=` + date.toUTCString() + "; path=/";
  document.cookie =
    `schoolCode=${schoolCode}; expires=` + date.toUTCString() + "; path=/";
  document.cookie =
    `lectioCookies=${encodeURIComponent(lectioCookies)}; expires=` +
    date.toUTCString() +
    "; path=/";
  document.cookie =
    `userId=${userId}; expires=` + date.toUTCString() + "; path=/";
}
