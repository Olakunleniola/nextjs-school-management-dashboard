/* eslint-disable @typescript-eslint/no-explicit-any */
interface Prop {
  header: string;
  accessor: string;
  className?: string;
}

const Table = ({
  columns,
  renderCell,
  data,
}: {
  columns: Prop[];
  renderCell: (items: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return renderCell(item);
        })}
      </tbody>
    </table>
  );
};

export default Table;
