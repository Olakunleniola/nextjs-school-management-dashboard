"use client";

import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

// Removed unused 'style' variable

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    { name: "Total", count: boys + girls, fill: "#fff" },
    { name: "Girls", count: girls, fill: "#fae27c" },
    { name: "Boys", count: boys, fill: "#c3ebfa" },
  ];

  return (
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
  );
};

export default CountChart;
