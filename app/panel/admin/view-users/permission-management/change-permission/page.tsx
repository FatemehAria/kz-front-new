"use client";
import React from "react";
import RolePermission from "./role-permission";
import PositionPermission from "./position-permission";

function ChangePermission() {
  return (
    <div>
      <RolePermission />
      <PositionPermission />
    </div>
  );
}

export default ChangePermission;
