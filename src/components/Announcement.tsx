import prisma from "@/lib/prisma";
import { formatDate, getUserRole } from "@/lib/utils";

const Announcement = async () => {
  const { role, userId } = await getUserRole();

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] },
        ],
      }),
    },
  });

  const bgs = ["schoolSkyLight", "schoolPurpleLight", "schoolYellowLight"];

  return (
    <div className="w-full bg-white rounded-2xl px-5 py-2">
      <div className="flex justify-between items-center my-2">
        {/* TOP */}
        <h1 className="text-lg font-semibold">Announcements</h1>
        <span className="text-sm text-gray-400 cursor-pointer hover:underline">
          view all
        </span>
      </div>
      <div className="flex flex-col gap-4 my-4">
        {data.length !== 0 &&
          data.map((item, index) => (
            <div className="flex flex-col gap-4" key={item.id}>
              <div className={`bg-${bgs[index % bgs.length]} rounded-lg p-4 `}>
                <div className="center-btw">
                  <h1 className="font-semibold">{item.title}</h1>
                  <span className="rounded-md bg-white text-xs py-1 px-2 ">
                    {formatDate(item.date)}
                  </span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2 mt-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Announcement;
