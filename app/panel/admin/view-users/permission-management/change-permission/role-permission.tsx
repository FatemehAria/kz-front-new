"use client";
import React, { useContext, useEffect, useState } from "react";
import { PermissionContext } from "../../context/permission-context/PermissionContext";
import { RoleContext } from "../../context/role-context/RoleContext";
import {
  giveRolePermission,
  removeRolePermission,
} from "@/utils/relation-utils";
import { useSelector } from "react-redux";

function RolePermission() {
  const { token } = useSelector((state: any) => state.userData);
  const { permissions, permissionId, setPermissionId } =
    useContext(PermissionContext);
  const { roles, roleId, setRoleId, setRoles } = useContext(RoleContext);
  const permissionIds = permissions.filter((item) => item.id);
  const roleIds = roles.filter((item) => item.role.id);
  const [isAttaching, setIsAttaching] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let localRoles = JSON.parse(
        window.localStorage.getItem("roles") as string
      );
      setRoles(localRoles);
    }
  }, []);

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAttaching) {
      await giveRolePermission(token, Number(roleId), Number(permissionId));
    } else {
      await removeRolePermission(token, Number(roleId), Number(permissionId));
    }
  };

  //   console.log("permissions", permissions);
  //   console.log("roles", roles);
  //   console.log("permissionId", permissionId);
  //   console.log("roleId", roleId);
  return (
    <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] space-y-3">
      <div className="flex gap-3 items-center justify-center">
        <p
          className={`appearance-none border-2 border-black rounded-sm w-4 h-4 ${
            isAttaching ? "bg-[#4866CF]" : "bg-white"
          }`}
          onClick={() => setIsAttaching(!isAttaching)}
        />
      </div>
      <form onSubmit={(e) => handleSubmission(e)}>
        <label htmlFor="permissions">دسترسی ها</label>
        <select
          name="permissions"
          id="permissions"
          value={permissionId}
          onChange={(e) => setPermissionId(e.target.value)}
        >
          {permissionIds.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id}
            </option>
          ))}
        </select>

        <label htmlFor="roles">نقش ها</label>
        <select
          name="roles"
          id="roles"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
        >
          {roleIds.map((item) => (
            <option key={item.role.id} value={item.role.id}>
              {item.role.id}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default RolePermission;
