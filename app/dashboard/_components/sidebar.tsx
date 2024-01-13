import { SidebarList } from "./sidebar-list";

export const Sidebar = () => {
  return (
    <div className="h-full border-r bg-neutral-100 dark:bg-neutral-900 shadow-md flex flex-col overflow-y-auto">
      <SidebarList />
    </div>
  );
};
