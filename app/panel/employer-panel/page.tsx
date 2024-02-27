"use client";
import PanelCards from "@/components/panel/panel-cards";
import { employerDashboardInfo } from "@/lib/data";
import { useState } from "react";
import { useSelector } from "react-redux";

const EmployerPanel = () => {
  const [employerInfo, setEmployerInfo] = useState({
    active: 0,
    deactive: 0,
    employed: 0,
    activeTickets: 0,
  });
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
    <PanelCards
      dashboardInfo={employerDashboardInfo}
      employerInfo={employerInfo}
      membership={membership}
    />
  );
};
export default EmployerPanel;
