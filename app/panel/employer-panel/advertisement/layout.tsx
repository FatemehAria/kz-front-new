"use client";
import AdnavNums from "@/components/panel/adnav-nums";
import { useState } from "react";
import Position from "./components/position";
import Info from "./components/info";
import Check from "./components/benefits";
import Advertisement from "./page";
import Language from "./components/language";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div dir="rtl">
      <div className="w-full overflow-auto">{children}</div>
    </div>
  );
};
export default PanelLayout;
