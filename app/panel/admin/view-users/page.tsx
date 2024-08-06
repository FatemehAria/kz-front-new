"use client";
import React, { useContext, useEffect, useState } from "react";
import PersonalInfoHeader from "../../user/personal-info/components/personal-info-header";
import LegalUsers from "./legal-users";
import GenuineUsers from "./genuine-users";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RoleContext } from "../context/role-context/RoleContext";
import { PermissionContext } from "../context/permission-context/PermissionContext";
import { PositionContext } from "../context/position-context/PositionContext";
import { DepartmentContext } from "../context/department-context/DepartmentContext";
import { UserContext } from "../context/user-context/UserContext";

function ViewUsers() {
  const { token } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const { setRoles, roles } = useContext(RoleContext);
  const { permissions, setPermissions } = useContext(PermissionContext);
  const { positions, setPositions } = useContext(PositionContext);
  const { setDepartments } = useContext(DepartmentContext);
  const { setAllUsersData, AllUsersData } = useContext(UserContext);
  const [type, setType] = useState("Genuine");

  const [legalUsers, setLegalUsers] = useState<any>([]);
  const [genuineUsers, setGenuineUsers] = useState<any>([]);
  const [usersStatus, setUsersStatus] = useState({
    loading: false,
  });
  const [searchUsers, setSearchUsers] = useState("");
  const renderLegalUsers = () => {
    let legal = AllUsersData.filter((item: any) => item.type === "hoghooghi");
    setLegalUsers(legal);
  };

  const renderGenuineUsers = () => {
    let genuine = AllUsersData.filter((item: any) => item.type === "haghighi");
    setGenuineUsers(genuine);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const roles = JSON.parse(window.localStorage.getItem("roles") as string);
      const positions = JSON.parse(
        window.localStorage.getItem("positions") as string
      );
      const permissions = JSON.parse(
        window.localStorage.getItem("permissions") as string
      );
      setPositions(positions);
      setPermissions(permissions);
      setRoles(roles);
    }
  }, []);

  useEffect(() => {
    renderLegalUsers();
    renderGenuineUsers();
  }, [AllUsersData, type]);

  const renderSteps = () => {
    switch (type) {
      case "Genuine":
        return (
          <GenuineUsers
            GenuineUsersData={genuineUsers}
            usersStatus={usersStatus}
            setAllUsers={setAllUsersData}
            setDataStatus={setUsersStatus}
            token={token}
            AllUsersData={AllUsersData}
            searchUsers={searchUsers}
            setSearchUsers={setSearchUsers}
          />
        );
      case "Legal":
        return (
          <LegalUsers
            LegalUsersData={legalUsers}
            usersStatus={usersStatus}
            setAllUsers={setAllUsersData}
            setDataStatus={setUsersStatus}
            token={token}
            AllUsersData={AllUsersData}
            searchUsers={searchUsers}
            setSearchUsers={setSearchUsers}
          />
        );
      default:
        return;
    }
  };
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex flex-row gap-5">
        <Link
          href={"/panel/admin/view-users/permission-management"}
          className="text-white bg-[#4866CF] p-2 rounded-[5px] w-[160px] whitespace-nowrap"
        >
          مدیریت دسترسی ها
        </Link>
        <Link
          href={"/panel/admin/view-users/role-management"}
          className="text-white bg-[#4866CF] p-2 rounded-[5px] w-[130px] whitespace-nowrap"
        >
          مدیریت نقش ها
        </Link>
        <Link
          href={"/panel/admin/view-users/position-management"}
          className="text-white bg-[#4866CF] p-2 rounded-[5px] w-[140px] whitespace-nowrap"
        >
          مدیریت جایگاه ها
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-10 w-full">
        <PersonalInfoHeader step={type} setStep={setType} />
        <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%]">
          {renderSteps()}
        </div>
      </div>
    </div>
  );
}

export default ViewUsers;
