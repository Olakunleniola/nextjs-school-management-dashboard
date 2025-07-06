import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <div className="w-[14%] md:w-[8%] lg:w-[20%] xl:[14%] p-4 overflow-auto">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image
            src="/school-logo.png"
            alt="SchoolSphere Logo"
            width={50}
            height={50}
            className="h-auto"
          />
          <span className="xl:text-2xl font-extrabold hidden lg:block leading-2 text-orange-400">
            School<span className="text-teal-400">Sphere</span>
          </span>
        </Link>
        <Menu />
      </div>
      <div className="bg-red-300 w-[86%] md:w-[92%] lg:w-[80%] xl:w-[86%]">
        <nav></nav>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
