import Pagination from "@/components/Pagination";
import Search from "@/components/TableSearch";
import Table from "@/components/Table";
import Image from "next/image";
import FormModal from "@/components/FormModal";
import { Announcement, Class, Prisma } from "@/generated/prisma";
import { formatDate, getUserRole, tableItem } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";

type AnnouncementProp = Announcement & { class: Class };

const columns = (role: string | null) => [
  { header: "Title", accessor: "title" },
  { header: "Class", accessor: "class" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
];

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const {role} = await getUserRole();
  console.log(role);
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.AnnouncementWhereInput = {};

  const renderCell = (items: AnnouncementProp) => (
    <tr
      key={items.id}
      className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
    >
      <td className="flex items-center p-4 gap-4">{items.title}</td>
      <td>{items.class.name}</td>
      <td className="hidden md:table-cell">{formatDate(items.date)}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal type="update" table="announcement" data={items} />
              <FormModal type="delete" table="announcement" id={items.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  if (Object.keys(queryParams).length) {
    for (const [key, value] of Object.entries(queryParams)) {
      switch (key) {
        case "search":
          {
            query.title = { contains: value, mode: "insensitive" };
          }
          break;
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: tableItem(p),
    }),
    prisma.announcement.count({ where: query }),
  ]);
  return (
    <div className="flex-1 mx-4 p-4 bg-white rounded-lg space-y-6 ">
      {/* TOP  */}
      <div className="center-btw gap-4 ">
        <h1 className=" hidden md:block text-xl font-semibold ">
          All Announcements
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
            {role === "admin" && (
              <FormModal type="create" table="announcement" />
            )}
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <Table columns={columns(role)} renderCell={renderCell} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AnnouncementListPage;
