import Pagination from "@/components/Pagination";
import Search from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import { Class, Prisma, Teacher } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getUserRole } from "@/lib/utils";
import FormContainer from "@/components/FormContainer";

type ClassesProp = Class & { supervisor: Teacher };

const columns = (role: string | null) => [
  { header: "Class Name", accessor: "classes" },
  {
    header: "Capaity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
];

const ClassesListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { role, userId } = await getUserRole();
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ClassWhereInput = {};
  // Parameter Conditions
  if (Object.keys(queryParams).length) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            {
              query.name = { contains: value, mode: "insensitive" };
            }
            break;
          case "supervisorid":
            {
              query.supervisorId = value;
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
    query.supervisorId = userId!;
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      include: { supervisor: true },
      where: query,
      skip: ITEMS_PER_PAGE * (p - 1),
      take: ITEMS_PER_PAGE,
    }),
    prisma.class.count({ where: query }),
  ]);

  const renderCell = (items: ClassesProp) => (
    <tr
      key={items.id}
      className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
    >
      <td className="flex items-center p-4 gap-4">{items.name}</td>
      <td className="hidden md:table-cell">{items.capacity}</td>
      <td className="hidden md:table-cell">{items.name[0]}</td>
      <td className="hidden md:table-cell">{items.supervisor.name}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer type="update" table="class" data={items} />
              <FormContainer type="delete" table="class" id={items.id} />
            </>  
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 mx-4 p-4 bg-white rounded-lg space-y-6 ">
      {/* TOP  */}
      <div className="center-btw gap-4 ">
        <h1 className=" hidden md:block text-xl font-semibold ">All Classes</h1>
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
              <Image src="/sorts.png" alt="sort-logo" width={20} height={20} />
            </button>
            {role === "admin" && <FormContainer type="create" table="class" />}
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

export default ClassesListPage;
