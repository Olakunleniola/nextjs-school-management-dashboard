export const ITEMS_PER_PAGE = 10;
export const tableItem = (val: number) => ITEMS_PER_PAGE * (val - 1);
export const formatDate = (arg: Date) => new Intl.DateTimeFormat("en-US").format(arg)