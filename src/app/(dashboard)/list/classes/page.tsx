import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Table from "@/components/Table";
import Image from "next/image";
import { role, classesData } from "../../../../../lib/Data";
import FormModal from "@/components/FormModal";

interface ClassesProp {
  id: number;
  supervisor: string;
  name: string;
  grade: number;
  capacity: number;
}

const columns = [
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
  { header: "Actions", accessor: "action" },
];

const ClassesListPage = () => {
  const renderCell = (items: ClassesProp) => (
    <tr
      key={items.id}
      className="border-b border-gray-200 even:bg-slate-50 text-xs hover:bg-schoolPurpleLight xl:text-sm"
    >
      <td className="flex items-center p-4 gap-4">{items.name}</td>
      <td className="hidden md:table-cell">{items.capacity}</td>
      <td className="hidden md:table-cell">{items.grade}</td>
      <td className="hidden md:table-cell">{items.supervisor}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal type="update" table="class" data={items} />
              <FormModal type="delete" table="class" id={items.id} />
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
              <Image src="/sort.png" alt="sort-logo" width={20} height={20} />
            </button>
            {role === "admin" && <FormModal type="create" table="class" />}
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <Table columns={columns} renderCell={renderCell} data={classesData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ClassesListPage;
