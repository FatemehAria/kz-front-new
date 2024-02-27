"use client";
import { MainadminSiteChangeSidebarInfo } from "@/lib/data";
import ChangeSiteSidebar from "./components/change-site-sidebar";

const ChangeSiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row">
      <ChangeSiteSidebar sidebarOptions={MainadminSiteChangeSidebarInfo} />
      <div className="px-[5%] w-full">
        {children}
      </div>
    </div>
  );
};
export default ChangeSiteLayout;
