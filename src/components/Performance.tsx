"use client";
import Image from "next/image";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#c3ebfa" },
  { name: "Group B", value: 8, fill: "#fae27c" },
];

const Performance = () => {
  return (
    <div className="w-full bg-white rounded-lg h-88 p-4 flex flex-col gap-10 relative">
      <div className="flex justify-between items-center">
        {/* TOP */}
        <h1 className="text-lg font-bold">Performance</h1>
        <Image
          src="/moreDark.png"
          alt="menu icon"
          width={20}
          height={20}
          className="cursor-pointer h-auto"
        />
      </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0} 
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              fill="#8884d8"
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-4xl font-bold">9.2</h1>
          <p className="text-xs text-gray-300">of 10 max</p>
        </div>
        <h2 className="text-sm absolute font-semibold left-0 right-0 bottom-16 m-auto text-center">1st Semester - 2nd Semester</h2>
    </div>
  );
};

export default Performance;
