import Announcement from "@/components/Announcement";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Student = async () => {
  const { userId } = await auth();
  const classData = await prisma.class.findMany({
    where: { students: { some: { id: userId! } } },
  });

  return (
    <div className="flex flex-col xl:flex-row gap-5 p-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 ">
        <div className="bg-white p-5 h-full rounded-2xl">
          <h1 className="text-lg font-semibold">
            Schedule ({classData[0]?.name})
          </h1>
          <BigCalendarContainer type="classId" id={classData[0]?.id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-5">
        <EventCalendar />
        <Announcement />
      </div>
    </div>
  );
};

export default Student;
