import { createContext } from "react";
import { PermissionType } from "../../permission-management/page";

interface PermissionContexttype {
  permissions: PermissionType[];
  setPermissions: React.Dispatch<React.SetStateAction<PermissionType[]>>;
  permissionId: string;
  setPermissionId: React.Dispatch<React.SetStateAction<string>>;
}
export const PermissionContext = createContext<PermissionContexttype>({
  permissions: [],
  setPermissions: () => {},
  permissionId: "",
  setPermissionId: () => {},
});
