"use client";
import React, { useEffect, useState } from "react";
import PersonalInfoHeader from "../../user/personal-info/components/personal-info-header";
import LegalUsers from "./legal-users";
import GenuineUsers from "./genuine-users";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { getAllUsers } from "@/utils/utils";

function ViewUsers() {
  const { token } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  const [type, setType] = useState("Genuine");
  const [AllUsersData, setAllUsersData] = useState<any>([]);
  const [legalUsers, setLegalUsers] = useState([]);
  const [genuineUsers, setGenuineUsers] = useState([]);
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
    getAllUsers(token, setAllUsersData, setUsersStatus);
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
    <div className="grid grid-cols-1 gap-10 w-full">
      <PersonalInfoHeader step={type} setStep={setType} />
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%]">
        {renderSteps()}
      </div>
    </div>
  );
}

export default ViewUsers;
