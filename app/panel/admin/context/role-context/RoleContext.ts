import { createContext } from "react";
import { RoleType } from "../../role-management/page";
interface PermissionContexttype {
  roles: RoleType[];
  setRoles: React.Dispatch<React.SetStateAction<RoleType[]>>;
  roleId: string;
  setRoleId: React.Dispatch<React.SetStateAction<string>>;
}
export const RoleContext = createContext<PermissionContexttype>({
  roles: [],
  setRoles: () => {},
  roleId: "",
  setRoleId: () => {},
});
