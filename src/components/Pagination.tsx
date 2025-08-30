"use client";

import { ITEMS_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();
  const hasPrev = ITEMS_PER_PAGE * (page - 1) <= 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE >= count;
  const changePage = (pageNumber: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", pageNumber.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="center-btw text-gray-500 w-full">
      <button
        disabled={hasPrev}
        className="py-2 px-4 bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-md cursor-pointer"
        onClick={() => changePage(page - 1)}
      >
        Prev
      </button>
      <div className="center text-xs gap-2">
        {Array.from(
          { length: Math.ceil(count / ITEMS_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex + "array"}
                className={`${
                  page === pageIndex ? "bg-schoolSky" : ""
                } p-2 rounded-md cursor-pointer hover:bg-gray-200`}
                onClick={() => changePage(pageIndex)}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        disabled={hasNext}
        onClick={() => changePage(page + 1)}
        className="py-2 px-4 bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-md cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
