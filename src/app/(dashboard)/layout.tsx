import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-[86%] md:w-[92%] lg:w-[80%] xl:w-[86%] overflow-auto bg-background flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
