"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  givePositionPermission,
  removePositionPermission,
} from "@/utils/relation-utils";
import { PositionContext } from "../../../context/position-context/PositionContext";
import { PermissionContext } from "../../../context/permission-context/PermissionContext";

function PositionPermission() {
  const { token } = useSelector((state: any) => state.userData);
  const { permissions, permissionId, setPermissionId } =
    useContext(PermissionContext);
  const { positions, positionId, setPositionId, setPositions } =
    useContext(PositionContext);
  const permissionIds = permissions.filter((item) => item.id);
  const positionIds = positions.filter((item) => item.position.id);
  const [isAttaching, setIsAttaching] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let localPositions = JSON.parse(
        window.localStorage.getItem("positions") as string
      );
      setPositions(localPositions);
    }
  }, []);

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAttaching) {
      await givePositionPermission(
        token,
        Number(positionId),
        Number(permissionId)
      );
    } else {
      await removePositionPermission(
        token,
        Number(positionId),
        Number(permissionId)
      );
    }
  };
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

        <label htmlFor="positions">موقعیت ها</label>
        <select
          name="positions"
          id="positions"
          value={positionId}
          onChange={(e) => setPositionId(e.target.value)}
        >
          {positionIds.map((item) => (
            <option key={item.position.id} value={item.position.id}>
              {item.position.id}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default PositionPermission;
