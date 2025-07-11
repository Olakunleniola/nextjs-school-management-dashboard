import React from "react";

const Pagination = () => {
  return (
    <div className="center-btw text-gray-500 w-full">
      <button
        disabled
        className="py-2 px-4 bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-md cursor-pointer"
      >
        Prev
      </button>
      <div className="center text-xs">
        <button className="bg-schoolSky p-2 rounded-md">1</button>
        <button className="p-2 hidden sm:block rounded-md">1</button>
        <button className="p-2 hidden sm:block rounded-md">2</button>
        <button className="p-2  hidden sm:block rounded-md">3</button>
        ...
        <button className="p-2">10</button>
      </div>
      <button className="py-2 px-4 bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-md cursor-pointer">
        Next
      </button>
    </div>
  );
};

export default Pagination;
