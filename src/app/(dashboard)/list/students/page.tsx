import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import { studentsData, role } from "../../../../../lib/Data";

interface StudentProp {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  class: string;
  grade: number;
  address: string;
}

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "stuent ID",
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
  { header: "Action", accessor: "action" },
];

const StudentsListPage = () => {
  const renderCell = (items: StudentProp) => (
    <tr
      key={items.id}
      className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
    >
      <td className="flex items-center p-4 gap-4">
        <Image
          src={items.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold ">{items.name}</h3>
          <p className="text-xs text-gray-500">{items.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{items.studentId}</td>
      <td className="hidden md:table-cell">{items.grade}</td>
      <td className="hidden lg:table-cell">{items?.phone}</td>
      <td className="hidden lg:table-cell">{items.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${items.id}`}>
            <button className="w-8 h-8 p-2 rounded-full bg-schoolSky cursor-pointer">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-8 h-8 p-2 rounded-full bg-schoolPurple cursor-pointer">
              <Image src="/delete.png" alt="" width={16} height={16} />
            </button>
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
            <button className="w-8 h-8 center rounded-full bg-schoolYellow p-2 cursor-pointer">
              <Image src="/plus.png" alt="plus-logo" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <Table columns={columns} renderCell={renderCell} data={studentsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentsListPage;
