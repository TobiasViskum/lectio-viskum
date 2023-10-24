"use client";

type Props = {
  username: string;
  password: string;
  schoolCode: string;
  lectioCookies: string;
};

export function setAuthCookies({
  username,
  password,
  schoolCode,
  lectioCookies,
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
    `lectioCookies=${lectioCookies}; expires=` +
    date.toUTCString() +
    "; path=/";
}
