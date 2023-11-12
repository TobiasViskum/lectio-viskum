"use server";

type Props = { userId: string };

export async function clearUserCache({ userId }: Props) {
  global.shortTermCache.delete(`user-${userId}`);
  return;
}
