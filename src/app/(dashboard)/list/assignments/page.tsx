import Pagination from "@/components/Pagination";
import Search from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import { role } from "../../../../../lib/Data";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import {
  Assignment,
  Teacher,
  Class,
  Subject,
  Prisma,
} from "@/generated/prisma";
import { formatDate, ITEMS_PER_PAGE, tableItem } from "@/lib/settings";

type AssignmentProp = Assignment & {
  lesson: {
    teacher: Teacher;
    subject: Subject;
    class: Class;
  };
};

const columns = [
  { header: "Subject Name", accessor: "subjects" },
  { header: "Class", accessor: "class" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Due Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

const renderCell = (items: AssignmentProp) => (
  <tr
    key={items.id}
    className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
  >
    <td className="flex items-center p-4 gap-4">{items.lesson.subject.name}</td>
    <td>{items.lesson.class.name}</td>
    <td className="hidden md:table-cell">{items.lesson.teacher.name}</td>
    <td className="hidden md:table-cell">{formatDate(items.startDate)}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal type="update" table="assignment" data={items} />
            <FormModal type="delete" table="assignment" id={items.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ExamListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.AssignmentWhereInput = {};
  if (Object.keys(queryParams).length) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            {
              query.OR = [
                {
                  lesson: {
                    subject: { name: { contains: value, mode: "insensitive" } },
                  },
                },
                {
                  lesson: {
                    teacher: { name: { contains: value, mode: "insensitive" } },
                  },
                },
              ];
            }
            break;
          case "teacherid":
            {
              query.lesson = {
                teacherId: value,
              };
            }
            break;
          case "studentid":
            {
              query.lesson = {
                class: { students: { some: { id: value } } },
              };
            }
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      include: {
        lesson: {
          select: {
            teacher: { select: { name: true, surname: true } },
            subject: { select: { name: true } },
            class: { select: { name: true } },
          },
        },
      },
      where: query,
      skip: tableItem(p),
      take: ITEMS_PER_PAGE,
    }),
    prisma.assignment.count(),
  ]);

  return (
    <div className="flex-1 mx-4 p-4 bg-white rounded-lg space-y-6 ">
      {/* TOP  */}
      <div className="center-btw gap-4 ">
        <h1 className=" hidden md:block text-xl font-semibold ">
          All Assignments
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
            {role === "admin" && <FormModal type="create" table="assignment" />}
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <Table columns={columns} renderCell={renderCell} data={data} />
      {/* PAGINATION */}
      <Pagination count={count} page={p} />
    </div>
  );
};

export default ExamListPage;
