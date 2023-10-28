"use server";

type Props = { userId: string };

export async function clearUserCache({ userId }: Props) {
  global.cache.delete(`user-${userId}`);
  return;
}
