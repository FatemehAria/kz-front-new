"use client";
import PanelCards from "@/components/panel/panel-cards";
import { useSelector } from "react-redux";
import { UserDashboardInfo } from "@/lib/data";

const UserPanel = () => {
  const { userProfile } = useSelector((store: any) => store.userRole);

  const calcMembership = () => {
    const createdAt = userProfile.createdAt;
    const createdAtDate = new Date(createdAt);
    const currentTime = new Date();
    const duration = currentTime.getTime() - createdAtDate.getTime();
    const daysOfMembership = Math.floor(duration / (1000 * 60 * 60 * 24));
    return daysOfMembership;
  };
  let membership = calcMembership().toString();

  return (
    <>
      <div className="px-[3%] lg:px-0 py-[1%]">
        <PanelCards dashboardInfo={UserDashboardInfo} membership={membership} />
      </div>
    </>
  );
};
export default UserPanel;
