import { ITEMS_PER_PAGE } from "./settings";
import { auth } from "@clerk/nextjs/server";

export const tableItem = (val: number) => ITEMS_PER_PAGE * (val - 1);

export const formatDate = (arg: Date) =>
  new Intl.DateTimeFormat("en-US").format(arg);

export const formatTime = (arg: Date) =>
  arg.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function getUserRole() {
  const { sessionClaims, userId } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  return { role, userId };
}
