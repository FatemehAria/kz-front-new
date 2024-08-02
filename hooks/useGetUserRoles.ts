"use client";
import { userRoleType } from "@/types/types";
import { useSelector } from "react-redux";

export const useGetUserRoles = () => {
  const { userType } = useSelector((state: any) => state.userData);
  const userRoles = userType
    ? userType.map((item: userRoleType) => item.name_en)
    : "User";
  return userRoles;
};
