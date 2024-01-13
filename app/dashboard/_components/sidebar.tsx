import Image from "next/image";
import { SidebarList } from "./sidebar-list";

export const Sidebar = () => {
  return (
    <div className="h-full border-r bg-neutral-100 dark:bg-neutral-900 shadow-md flex flex-col overflow-y-auto">
      <div className="p-4 flex items-center gap-x-2 mb-8">
        <Image src="/logo.svg" width="60" height="60" alt="Logo" />
        <h2 className="font-bold text-primary text-xl">Next Crypto</h2>
      </div>
      <SidebarList />
    </div>
  );
};
