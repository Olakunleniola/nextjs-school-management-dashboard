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

const currentWorkWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
  const distanceToMonday = (dayOfWeek + 6) % 7; // Calculate distance to Monday
  const startOfWeek = new Date(
    today.setDate(today.getDate() - distanceToMonday)
  );
  startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day
  return startOfWeek;
};

export const adjustSchedueToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const startOfWeek = currentWorkWeek();
  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();
    const daysFromMonday = (lessonDayOfWeek + 6) % 7; // Calculate days from Monday
    const adjustedStartDate = new Date(startOfWeek);
    adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );
    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};
