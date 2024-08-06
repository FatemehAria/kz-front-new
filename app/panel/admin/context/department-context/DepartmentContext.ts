"use client";
import { createContext } from "react";
import { DepartmentType } from "../../../org_management/departments/page";

export interface DepartmentTypeInterface {
  departments: DepartmentType[];
  setDepartments: React.Dispatch<React.SetStateAction<DepartmentType[]>>;
}
export const DepartmentContext = createContext<DepartmentTypeInterface>({
  departments: [],
  setDepartments: () => {},
});
