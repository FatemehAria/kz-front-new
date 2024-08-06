"use client";
import React, { useState } from "react";
import { DepartmentContext } from "./DepartmentContext";
import { DepartmentType } from "../../../org_management/departments/page";

function DepartmentContextWrapper({ children }: { children: React.ReactNode }) {
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  return (
    <DepartmentContext.Provider value={{ departments, setDepartments }}>
      {children}
    </DepartmentContext.Provider>
  );
}

export default DepartmentContextWrapper;
