import { UserDashboardInfo } from "@/lib/data";
import React from "react";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-y-20 justify-center items-center text-center bg-white shadow mx-auto rounded-2xl w-full px-[3%] py-[8%]">
      {UserDashboardInfo.map((item) => (
        <DashboardCard key={item.id} data={item}/>
      ))}
    </div>
  );
}

export default Dashboard;
