import Announcement from "@/components/Announcement";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartCountainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const Admin = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  return (
    <div className="flex flex-wrap flex-col md:flex-row p-4 gap-8 ">
      <div className="w-full lg:w-2/3 flex-1">
        {/* USER CARD */}
        <div className="flex w-full gap-4 flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
        {/* MIDDLE CHART */}
        <div className="flex gap-5 justify-between flex-col lg:flex-row mt-4">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px] ">
            <CountChartCountainer />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px] mt-4">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-5">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcement />
      </div>
    </div>
  );
};

export default Admin;
