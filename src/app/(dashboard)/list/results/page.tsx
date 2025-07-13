import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Table from "@/components/Table";
import Image from "next/image";
import Link from "next/link";
import { role, resultsData } from "../../../../../lib/Data";

interface ResultProp {
  id: number;
  date: string;
  subject: string;
  teacher: string;
  student: string;
  class: number;
  score: number;
  type: "exam" | "assignment";
}

const columns = [
  { header: "Subject Name", accessor: "subjects" },
  { header: "Student", accessor: "student", className: "hidden md:table-cell" },
  { header: "Score", accessor: "score" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell " },
  { header: "Due Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Action", accessor: "action" },
];

const ExamListPage = () => {
  const renderCell = (items: ResultProp) => (
    <tr
      key={items.id}
      className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
    >
      <td className="flex items-center p-4 gap-4">{items.subject}</td>
      <td className="hidden md:table-cell">{items.student}</td>
      <td>{items.score}</td>
      <td className="hidden md:table-cell">{items.teacher}</td>
      <td className="hidden md:table-cell">{items.class}</td>
      <td className="hidden md:table-cell">{items.date}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${items.id}`}>
            <button className="w-8 h-8 p-2 rounded-full bg-schoolSky cursor-pointer">
              <Image src="/edit.png" alt="" width={16} height={16} />
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
            <button className="w-8 h-8 center rounded-full bg-schoolYellow p-2 cursor-pointer">
              <Image src="/plus.png" alt="plus-logo" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <Table columns={columns} renderCell={renderCell} data={resultsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ExamListPage;
