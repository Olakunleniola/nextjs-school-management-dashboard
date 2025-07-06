import Image from "next/image";
import { menuItems } from "../../lib/Data";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-[14%] md:w-[8%] lg:w-[20%] xl:[14%] p-4 overflow-auto">
      {/* Logo and brand  */}
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
      {/* Menu Items  */}
      <div className="text-sm mt-5 ">
        {menuItems.map((item) => (
          <div key={item.title} className="flex flex-col gap-2  ">
            <span className="uppercase hidden lg:block text-gray-400 font-light my-4">
              {item.title}
            </span>
            {item.items.map((data) => (
              <Link
                key={data.label}
                href={data.href}
                className="flex items-center justify-center gap-4 text-gray-500 p-1 lg:justify-start hover:bg-gray-200 rounded-2xl px-2 py-2"
              >
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
    </div>
  );
};

export default Sidebar;
