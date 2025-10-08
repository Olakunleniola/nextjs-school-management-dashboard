"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    params.set("search", (e.currentTarget[0] as HTMLInputElement).value);
    params.set("page", "1")
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-auto w-full flex items-center gap-2 text-xs ring-[1.5px] px-2 ring-gray-300 rounded-full shadow-sm"
    >
      {/* <Image src="/search.png" alt="search" width={14} height={14} className="h-auto size-4 object-contain" /> */}
      <input
        type="text"
        placeholder="Search......"
        className="w-[200px] bg-transparent p-2 text-base text-gray500 placeholder-gray-400 outline-hidden"
      />
    </form>
  );
};

export default TableSearch;
