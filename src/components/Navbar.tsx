import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { capitalizeWords } from "@/lib/utils";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-between p-4 ">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 ring-[1.5px] px-2 ring-gray-300 rounded-2xl shadow-sm">
        <Image
          src="/search.png"
          alt="search-logo"
          width={20}
          height={20}
          className=""
        />
        <input
          type="text"
          placeholder="Search......"
          className="w-[200px] bg-transparent p-2 text-base text-gray500 placeholder-gray-400 outline-hidden"
        />
      </div>
      <div className="flex items-center justify-end w-full p-3 gap-5 cursor-pointer">
        <div className="flex w-7 h-7 rounded-full bg-white items-center justify-center">
          <Image
            src="/message.png"
            alt="message-logo"
            width={20}
            height={20}
            className=""
          />
        </div>
        <div className="flex w-7 h-7 rounded-full bg-white items-center justify-center relative">
          <Image
            src="/announcement.png"
            alt="message-logo"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className="bg-teal-500 text-white w-4 h-4 rounded-full absolute -right-2 -top-2 flex justify-center align-center text-center text-xs">
            1
          </p>
        </div>
        <div className="flex flex-col">
          <span className="leading-3 text-sm font-medium">John Doe</span>
          <span className="leading-3 text-[10px]  text-gray-500 text-right">
            {capitalizeWords(user?.publicMetadata?.role as string)}
          </span>
        </div>
        {/* <Image
          src="/avatar.png"
          alt="user-logo"
          width={36}
          height={36}
          className="rounded-full object-contain"
        /> */}
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
