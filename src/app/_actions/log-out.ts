"use server";

export async function LogOutUser(userId: string) {
  global.userSessions.delete(userId);
  return;
}
