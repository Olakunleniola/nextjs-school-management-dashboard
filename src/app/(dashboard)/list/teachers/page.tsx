import Pagination from "@/components/Pagination";
import Search from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import { role } from "@/lib/Data";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { Teacher, Class, Subject, Prisma } from "@/generated/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

const renderCell = (items: TeacherList) => (
  <tr
    key={items.id}
    className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
  >
    <td className="flex items-center p-4 gap-4">
      <Image
        src={items.img || "/avatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold ">{items.name}</h3>
        <p className="text-xs text-gray-500">{items?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{items.username}</td>
    <td className="hidden md:table-cell">
      {items.subjects.map((subject) => subject.name).join(",")}
    </td>
    <td className="hidden md:table-cell">
      {items.classes.map((classItem) => classItem.name).join(",")}
    </td>
    <td className="hidden lg:table-cell">{items.phone}</td>
    <td className="hidden lg:table-cell">{items.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${items.id}`}>
          <button className="w-7 h-7 p-2 rounded-full bg-schoolSky cursor-pointer">
            <Image src="/view.png" alt="" width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && (
          <FormModal type="delete" table="teacher" id={items.id} />
        )}
      </div>
    </td>
  </tr>
);

const TeachersListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  // SETUP URL PARAMS CONDITION
  const query: Prisma.TeacherWhereInput = {};
  if (Object.keys(queryParams).length) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classid": {
            query.lessons = {
              some: { classId: parseInt(value) },
            };
          }
          case "search": {
            query.name = { contains: value, mode: "insensitive" };
          }
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),

    prisma.teacher.count({
      where: query,
    }),
  ]);

  return (
    <div className="flex-1 mx-4 p-4 bg-white rounded-lg space-y-6 ">
      {/* TOP  */}
      <div className="center-btw gap-4 ">
        <h1 className=" hidden md:block text-xl font-semibold ">
          All Teachers
        </h1>
        <div className="flex items-center md:flex-row flex-col gap-4 w-full md:w-auto">
          <Search />
          <div className="flex items-center self-end md:self-center gap-4">
            <button className="w-8 h-8 center rounded-full bg-schoolYellow p-2 cursor-pointer">
              <Image
                src="/filter.png"
                alt="filter-logo"
                width={20}
                height={20}
              />
            </button>
            <button className="w-8 h-8 center rounded-full bg-schoolYellow p-2 cursor-pointer">
              <Image src="/sort.png" alt="sort-logo" width={20} height={20} />
            </button>
            {role == "admin" && <FormModal type="create" table="teacher" />}
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <Table columns={columns} renderCell={renderCell} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default TeachersListPage;
