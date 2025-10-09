import Pagination from "@/components/Pagination";
import Search from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import FormModal from "@/components/FormModal";
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { formatDate, getUserRole, tableItem } from "@/lib/utils";

type ResultProp = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

const columns = (role: string | null) => [
  { header: "Title", accessor: "title" },
  { header: "Student", accessor: "student", className: "hidden md:table-cell" },
  { header: "Score", accessor: "score" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell " },
  { header: "Due Date", accessor: "date", className: "hidden md:table-cell" },
  ...(role === "admin" || role === "teacher"
    ? [{ header: "Actions", accessor: "action" }]
    : []),
];

const ExamListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { role, userId } = await getUserRole();
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ResultWhereInput = {};

  // Parameter Conditions
  if (Object.keys(queryParams).length) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentid":
            {
              query.studentId = value;
            }
            break;
          case "search": {
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              { student: { name: { contains: value, mode: "insensitive" } } },
              {
                assignment: { title: { contains: value, mode: "insensitive" } },
              },
            ];
          }
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
      query.OR = [
        { exam: { lesson: { teacherId: userId! } } },
        { assignment: { lesson: { teacherId: userId! } } },
      ];
      break;
    case "student":
      query.studentId = userId!;
      break;
    case "parent":
      query.student = { parentId: userId! };
      break;
    default:
      break;
  }

  const [resData, count] = await prisma.$transaction([
    prisma.result.findMany({
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              include: {
                teacher: { select: { name: true, surname: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              include: {
                teacher: { select: { name: true, surname: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: tableItem(p),
      where: query,
    }),
    prisma.result.count({ where: query }),
  ]);

  const data = resData.map((item) => {
    const assessment = item.exam || item.assignment;
    if (!assessment) return null;
    const isExam = "startTime" in assessment;
    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  const renderCell = (items: ResultProp) => (
    <tr
      key={items.id}
      className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
    >
      <td className="flex items-center p-4 gap-4">{items.title}</td>
      <td className="hidden md:table-cell">
        {items.studentName + " " + items.studentSurname}
      </td>
      <td>{items.score}</td>
      <td className="hidden md:table-cell">
        {items.teacherName + " " + items.teacherSurname}
      </td>
      <td className="hidden md:table-cell">{items.className}</td>
      <td className="hidden md:table-cell">{formatDate(items.startTime)}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ||
            (role === "teacher" && (
              <>
                <FormModal type="update" table="result" data={items} />
                <FormModal type="delete" table="result" id={items.id} />
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
        <h1 className=" hidden md:block text-xl font-semibold ">All Results</h1>
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
            {(role === "admin" || role === "teacher") && (
              <FormModal type="create" table="result" />
            )}
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

export default ExamListPage;
