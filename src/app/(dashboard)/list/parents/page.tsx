import Pagination from "@/components/Pagination";
import Search from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import { role } from "../../../../../lib/Data";
import FormModal from "@/components/FormModal";
import { Parent, Prisma, Student } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";

type ParentProp = Parent & { students: Student[] };

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student Name", 
    accessor: "studentName",
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

const renderCell = (items: ParentProp) => (
  <tr
    key={items.id}
    className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
  >
    <td className="flex items-center p-4 gap-4">
      <div className="flex flex-col">
        <h3 className="font-semibold ">{items.name}</h3>
        <p className="text-xs text-gray-500">{items?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">
      {items.students.map((child) => child.name).join(", ")}
    </td>
    <td className="hidden lg:table-cell">{items.phone}</td>
    <td className="hidden lg:table-cell">{items.address}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal type="update" table="parent" data={items} />
            <FormModal type="delete" table="parent" id={items.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ParentListPage = async ({
  searchParams,
}: {      
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;
  // QUERY SETUP
  const query: Prisma.ParentWhereInput = {};
  if (Object.keys(queryParams).length) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            {
              query.name = { contains: value, mode: "insensitive" };
            }
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: { students: true },
      skip: ITEMS_PER_PAGE * (p - 1),
      take: ITEMS_PER_PAGE,
    }),
    prisma.parent.count({ where: query }),
  ]);
  return (
    <div className="flex-1 mx-4 p-4 bg-white rounded-lg space-y-6 ">
      {/* TOP  */}
      <div className="center-btw gap-4 ">
        <h1 className=" hidden md:block text-xl font-semibold ">All Parents</h1>
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
            {role === "admin" && <FormModal type="create" table="parent" />}
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

export default ParentListPage;
