import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Table from "@/components/Table";
import Image from "next/image";
import { role, examsData } from "../../../../../lib/Data";
import FormModal from "@/components/FormModal";

interface ExamProp {
  id: number;
  date: string;
  subject: string;
  teacher: string;
  class: number;
}

const columns = [
  { header: "Subject Name", accessor: "subjects" },
  { header: "Class", accessor: "class" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

const ExamListPage = () => {
  const renderCell = (items: ExamProp) => (
    <tr
      key={items.id}
      className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
    >
      <td className="flex items-center p-4 gap-4">{items.subject}</td>
      <td>{items.class}</td>
      <td className="hidden md:table-cell">{items.teacher}</td>
      <td className="hidden md:table-cell">{items.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal type="update" table="exam" data={items} />
              <FormModal type="delete" table="exam" id={items.id} />
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
        <h1 className=" hidden md:block text-xl font-semibold ">All Exams</h1>
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
            {role === "admin" && <FormModal type="create" table="exam" />}
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <Table columns={columns} renderCell={renderCell} data={examsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ExamListPage;
