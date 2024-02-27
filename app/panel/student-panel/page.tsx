"use client";
import Image from "next/image";
import React, {  useState } from "react";
import { studentDashboardInfo } from "@/lib/data";
import PanelCards from "@/components/panel/panel-cards";
import { useSelector } from "react-redux";

const StudentPanel = () => {
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
    <div>
      <PanelCards
        dashboardInfo={studentDashboardInfo}
        membership={membership}
      />
    </div>
  );
};
export default StudentPanel;
