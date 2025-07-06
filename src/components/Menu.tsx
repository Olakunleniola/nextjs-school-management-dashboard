import React from "react";
import { menuItems } from "../../lib/Data";
import Link from "next/link";
import Image from "next/image";

const Menu = () => {
  return (
    <div className="text-sm mt-5 ">
      {menuItems.map((item) => (
        <div key={item.title} className="flex flex-col gap-2  ">
          <span className="uppercase hidden lg:block text-gray-400 font-light my-4">{item.title}</span>
            {item.items.map((data) => (
                <Link key={data.label} href={data.href} className="flex items-center justify-center gap-4 text-gray-500 p-1 lg:justify-start">
                  <Image
                    src={data.icon}
                    alt="menu-logo"
                    width={20}
                    height={20}
                    className="h-auto"
                  />
                  <span className="hidden lg:block ">{data.label}</span>
                </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
