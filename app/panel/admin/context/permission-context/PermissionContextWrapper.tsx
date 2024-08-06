import React, { useState } from "react";
import { PermissionType } from "../../permission-management/page";
import { PermissionContext } from "./PermissionContext";

function PermissionContextWrapper({ children }: { children: React.ReactNode }) {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [permissionId, setPermissionId] = useState("");
  return (
    <PermissionContext.Provider
      value={{ permissions, setPermissions, permissionId, setPermissionId }}
    >
      {children}
    </PermissionContext.Provider>
  );
}

export default PermissionContextWrapper;
