import Pagination from "@/components/Pagination";
import Search from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import FormModal from "@/components/FormModal";
import { Class, Lesson, Prisma, Subject, Teacher } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getUserRole } from "@/lib/utils";

type lesson = Lesson & { class: Class } & { subject: Subject } & {
  teacher: Teacher;
};

const columns = (role: string | null) => [
  { header: "Subject Name", accessor: "subjects" },
  { header: "Class", accessor: "class" },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" || role === "teacher"
    ? [{ header: "Actions", accessor: "action" }]
    : []),
];

const LessonListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { role, userId } = await getUserRole();
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.LessonWhereInput = {};
  // Parameter Conditions
  if (Object.keys(queryParams).length) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            {
              query.OR = [
                { subject: { name: { contains: value, mode: "insensitive" } } },
                { teacher: { name: { contains: value, mode: "insensitive" } } },
              ];
            }
            break;
          case "teacherid":
            {
              query.teacherId = value;
            }
            break;
          case "studentid":
            {
              query.class = {
                students: {
                  some: {
                    id: value,
                  },
                },
              };
            }
            break;
          default:
            break;
        }
      }
    }
  }
  // Role Conditions
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.teacherId = userId!;
      break;
    case "student":
      query.class = { students: { some: { id: userId! } } };
      break;
    default:
      break;
  }

  const [count, data] = await prisma.$transaction([
    prisma.lesson.count({ where: query }),
    prisma.lesson.findMany({
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { name: true } },
      },
      where: query,
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
  ]);

  const renderCell = (items: lesson) => (
    <tr
      key={items.id}
      className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
    >
      <td className="flex items-center p-4 gap-4">{items.subject.name}</td>
      <td>{items.class.name}</td>
      <td className="hidden md:table-cell">{items.teacher.name}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ||
            (role === "teacher" && (
              <>
                <FormModal type="update" table="lesson" data={items} />
                <FormModal type="delete" table="lesson" id={items.id} />
              </>
            ))}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 mx-4 p-4 bg-white rounded-lg space-y-6 ">
      {/* TOP  */}
      <div className="center-btw gap-4 ">
        <h1 className=" hidden md:block text-xl font-semibold ">All Lessons</h1>
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
            {role === "admin" && <FormModal type="create" table="lesson" />}
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <Table columns={columns(role)} renderCell={renderCell} data={data} />
      {/* PAGINATION */}
      <Pagination count={count} page={p} />
    </div>
  );
};

export default LessonListPage;
