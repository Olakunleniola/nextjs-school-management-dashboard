import { getUserRole } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Sidebar = async () => {
  const { role } = await getUserRole();
  return (
    <div className="w-[13%] md:w-[8%] lg:w-[18%] xl:[14%] p-4 overflow-auto">
      {/* Logo and brand  */}
      <Link
        href="/"
        className="flex items-center justify-center lg:justify-start gap-1 xl:gap-2"
      >
        <Image
          src="/schoolsphere-logo.png"
          alt="SchoolSphere Logo"
          width={40}
          height={40}
          className="w-6 sm:w-8 md:w-8 lg:w-10 h-auto"
        />
        <span className="hidden lg:block text-base xl:text-2xl font-extrabold leading-tight text-orange-400">
          School<span className="text-teal-400">Sphere</span>
        </span>
      </Link>
      {/* Menu Items  */}
      <div className="text-sm mt-5">
        {menuItems.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <span className="uppercase hidden lg:block text-gray-400 font-light my-4">
              {item.title}
            </span>
            {item.items.map((data) => {
              if (data.visible.includes(role)) {
                return (
                  <Link
                    key={data.label}
                    href={data.href}
                    className="flex items-center justify-center gap-4 text-gray-500 md:px-2 lg:justify-start hover:bg-schoolSky rounded-md py-2"
                  >
                    <Image
                      src={data.icon}
                      alt="menu-logo"
                      width={20}
                      height={20}
                      className="h-auto"
                    />
                    <span className="hidden lg:block pr-2 ">{data.label}</span>
                  </Link>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
