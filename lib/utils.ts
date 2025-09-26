import { ITEMS_PER_PAGE } from "./settings";

export const tableItem = (val: number) => ITEMS_PER_PAGE * (val - 1);
export const formatDate = (arg: Date) =>
  new Intl.DateTimeFormat("en-US").format(arg);
export const formatTime = (arg: Date) =>
  arg.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
