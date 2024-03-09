"use client";
import PanelCards from "@/components/panel/panel-cards";
import { useSelector } from "react-redux";
import { UserDashboardInfo } from "@/lib/data";

const UserPanel = () => {
  // const { userProfile } = useSelector((store: any) => store.userRole);

  return (
    <>
      <div className="">
        {/* <PanelCards dashboardInfo={UserDashboardInfo} membership={membership} /> */}
      </div>
    </>
  );
};
export default UserPanel;
