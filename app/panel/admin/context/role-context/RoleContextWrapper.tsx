"use client";
import React, { useState } from "react";
import { RoleType } from "../../role-management/page";
import { RoleContext } from "./RoleContext";

function RoleContextWrapper({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [roleId, setRoleId] = useState("");
  return (
    <RoleContext.Provider value={{ roles, setRoles, roleId, setRoleId }}>
      {children}
    </RoleContext.Provider>
  );
}

export default RoleContextWrapper;
