import Image from "next/image";
import Calendar from "react-calendar";
import EventList from "./EventList";
import EventCalendar from "./EventCalendar";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { date } = await searchParams;
  return (
    <div className="w-full bg-white rounded-2xl p-5">
      <EventCalendar />
      <div className="flex justify-between items-center mt-2 mb-3 ">
        {/* TOP */}
        <h1 className="text-lg font-bold">Events</h1>
        <Image
          src="/moreDark.png"
          alt="menu icon"
          width={20}
          height={20}
          className="cursor-pointer h-auto"
        />
      </div>
      <EventList dateParam={date} />
    </div>
  );
};

export default EventCalendarContainer;
