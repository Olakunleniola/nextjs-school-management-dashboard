import prisma from "@/lib/prisma";
import { formatTime } from "@/lib/utils";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="border-2 border-gray-100 p-5 border-t-4 odd:border-t-schoolSky even:border-t-schoolPurple"
        >
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-gray-600">{item.title}</h1>
            <span className="text-xs text-gray-400">
              {formatTime(item.startTime)}
            </span>
          </div>
          <p className="line-clamp-1 mt-2 text-gray-400 text-sm">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
