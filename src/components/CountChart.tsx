"use client";

import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total", count: 100, fill: "#fff" },
  { name: "Girls", count: 52, fill: "#fae27c" },
  { name: "Boys", count: 48, fill: "#c3ebfa" },
];

// Removed unused 'style' variable

const CountChart = () => {
  return (
    <div className="w-full h-full bg-white p-5 rounded-2xl">
      {/* HEADER*/}
      <div className="flex justify-between items-center">
        {/* TOP */}
        <h1 className="text-lg font-bold">Students</h1>
        <Image
          src="/moreDark.png"
          alt="menu icon"
          width={20}
          height={20}
          className="cursor-pointer h-auto"
        />
      </div>
      {/* BODY */}
      <div className=" w-full h-[75%] relative flex items-center justify-center">
        {/* Added min-h-[250px] to help ensure the chart has height */}
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-1/2"
        />
      </div>
      {/* FOOTER */}
      <div className="flex xl:gap-16 lg:gap-3 gap-16 md:gap-16 items-center justify-center">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-schoolSky"></div>
          <p className="font-semibold xl:text-lg text-sm  ">1,345</p>
          <p className="text-gray-200 text-xs">Boys(55%)</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-schoolYellow"></div>
          <p className="font-semibold text-sm xl:text-lg">1,345</p>
          <p className="text-gray-200 text-xs">Girls(55%)</p>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
