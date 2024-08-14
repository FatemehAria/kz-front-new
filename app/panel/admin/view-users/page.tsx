"use client";
import React, { useContext, useEffect, useState } from "react";
import PersonalInfoHeader from "../../user/personal-info/components/personal-info-header";
import LegalUsers from "./legal-users";
import GenuineUsers from "./genuine-users";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { UserContext } from "../context/user-context/UserContext";
import { getAllUsers } from "@/utils/utils";
import { getTokenFromLocal } from "@/redux/features/user/userSlice";

function ViewUsers() {
  const { localToken } = useSelector((state: any) => state.userData);
  const [AllUsersData, setAllUsersData] = useState([]);
  const dispatch = useDispatch();
  // const { setAllUsersData, AllUsersData } = useContext(UserContext);
  const [type, setType] = useState("Genuine");
  const [searchUsers, setSearchUsers] = useState("");
  const [legalUsers, setLegalUsers] = useState<never[]>([]);
  const [genuineUsers, setGenuineUsers] = useState<never[]>([]);
  const [usersStatus, setUsersStatus] = useState({
    loading: false,
  });

  useEffect(() => {
    dispatch(getTokenFromLocal());
    getAllUsers(localToken, setAllUsersData, setUsersStatus);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const allUsers = JSON.parse(
        window.sessionStorage.getItem("users") as string
      );
      setAllUsersData(allUsers);
    }
  }, [setAllUsersData]);

  useEffect(() => {
    let legal = AllUsersData?.filter((item: any) => item.type === "hoghooghi");
    setLegalUsers(legal);
  }, [setLegalUsers, AllUsersData]);

  useEffect(() => {
    let genuine = AllUsersData?.filter((item: any) => item.type === "haghighi");
    console.log("genuine in page", genuine);
    setGenuineUsers(genuine);
  }, [setGenuineUsers, AllUsersData]);

  const renderSteps = () => {
    switch (type) {
      case "Genuine":
        return (
          <GenuineUsers
            GenuineUsersData={genuineUsers}
            usersStatus={usersStatus}
            setAllUsers={setAllUsersData}
            setDataStatus={setUsersStatus}
            token={localToken}
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
            token={localToken}
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
    <div className="grid grid-cols-1 gap-8">
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
        <PersonalInfoHeader step={type} setStep={setType} color="#ffffff" />
        <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%]">
          {renderSteps()}
        </div>
      </div>
    </div>
  );
}

export default ViewUsers;
