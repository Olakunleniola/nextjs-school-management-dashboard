import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustSchedueToCurrentWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const resData = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  const data = resData.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const adjustedData = adjustSchedueToCurrentWeek(data);

  return (
    <div>
      <BigCalendar data={adjustedData} />
    </div>
  );
};

export default BigCalendarContainer;
