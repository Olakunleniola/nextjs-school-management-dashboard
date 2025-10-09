import prisma from "@/lib/prisma";
import Image from "next/image";
import CountChart from "./CountChart";

const CountChartCountainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((itm) => itm.sex === "MALE")?._count || 0;
  const girls = data.find((itm) => itm.sex === "FEMALE")?._count || 0;

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
      {/* CHART */}
      <CountChart boys={boys} girls={girls} />
      {/* FOOTER */}
      <div className="flex xl:gap-16 lg:gap-3 gap-16 md:gap-16 items-center justify-center">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-schoolSky"></div>
          <p className="font-semibold xl:text-lg text-sm  ">{boys}</p>
          <p className="text-gray-300 text-xs">
            Boys({Math.round((boys / (boys + girls)) * 100)}%)
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-schoolYellow"></div>
          <p className="font-semibold text-sm xl:text-lg">{girls}</p>
          <p className="text-gray-300 text-xs">
            Girls({Math.round((girls / (boys + girls)) * 100)}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountChartCountainer;
