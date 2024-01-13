import { Navbar } from "@/components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative h-full">
      <div className="h-full w-56 hidden md:block fixed left-0">
        <Sidebar />
      </div>
      <div className="relative md:pl-56">
        <Navbar isSidebarControll={true} />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
