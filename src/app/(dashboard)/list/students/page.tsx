import Pagination from "@/components/Pagination";
import Search from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Class, Prisma, Student } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getUserRole } from "@/lib/utils";

type StudentProp = Student & { class: Class };

const columns = (role: string | null) => [
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden lg:table-cell",
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
  ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
];

const StudentsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { role, userId } = await getUserRole();
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.StudentWhereInput = {};
  query.class = {};
  // QUERY Conditions
  if (Object.keys(queryParams).length) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherid":
            {
              query.class.lessons = { some: { teacherId: value } };
            }
            break;
          case "search":
            {
              query.name = { contains: value, mode: "insensitive" };
            }
            break;
          default:
            break;
        }
      }
    }
  }

  // Role Conditions
 if (role === "teacher") {
    query.class = {supervisorId: userId!}
 }

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.student.count({ where: query }),
  ]);

  const renderCell = (items: StudentProp) => (
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
          <p className="text-xs text-gray-500">{items.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{items.username}</td>
      <td className="hidden md:table-cell">{items.class.name[0]}</td>
      <td className="hidden lg:table-cell">{items?.phone}</td>
      <td className="hidden lg:table-cell">{items.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${items.id}`}>
            <button className="w-7 h-7 p-2 rounded-full bg-schoolSky cursor-pointer">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal type="delete" table="student" id={items.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 mx-4 p-4 bg-white rounded-lg space-y-6 ">
      {/* TOP  */}
      <div className="center-btw gap-4 ">
        <h1 className=" hidden md:block text-xl font-semibold ">
          All Students
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
            {role === "admin" && <FormModal type="create" table="student" />}
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

export default StudentsListPage;
