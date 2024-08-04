"use client";
import React, { useState } from "react";
import { PlanContext } from "./PlanContext";

function PlanContextWrapper({ children }: { children: React.ReactNode }) {
  const [attrId, setAttrId] = useState("");
  return (
    <PlanContext.Provider value={{ attrId, setAttrId }}>
      {children}
    </PlanContext.Provider>
  );
}

export default PlanContextWrapper;
