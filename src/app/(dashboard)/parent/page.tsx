import Announcement from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";

const Parent = () => {
  return (
    <div className="flex-1 flex flex-col xl:flex-row gap-5 p-4 ">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 ">
        <div className="bg-white p-5 h-full rounded-2xl">
          <h1 className="text-lg font-semibold">Schedule (John Doe) </h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-5">
        <Announcement />
      </div>
    </div>
  );
};

export default Parent;
