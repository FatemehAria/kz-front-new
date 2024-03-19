"use client";
import React, { useEffect, useState } from "react";
import PersonalInfoHeader from "../../user/personal-info/components/personal-info-header";
import LegalUsers from "./legal-users";
import GenuineUsers from "./genuine-users";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";

function ViewUsers() {
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  const [type, setType] = useState("Genuine");
  const [AllUsersData, setAllUsersData] = useState<any>([]);
  const [legalUsers, setLegalUsers] = useState([]);
  const [genuineUsers, setGenuineUsers] = useState([]);
  const [legalUsersStatus, setLegalUsersStatus] = useState({
    error: "",
    loading: false,
  });
  const AllUsers = async () => {
    try {
      setLegalUsersStatus((last) => ({ ...last, loading: true }));
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/AllUser/${localUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setAllUsersData(JSON.parse(JSON.stringify(data.data)));
      setLegalUsersStatus((last) => ({ ...last, loading: false }));
      // console.log(data);
    } catch (error) {
      setLegalUsersStatus({
        error: "خطا در نمایش اطلاعات",
        loading: false,
      });
      // console.log(error);
    }
  };

  const renderLegalUsers = () => {
    let legal = AllUsersData.filter((item: any) => item.type === "Legal");
    setLegalUsers(legal);
    console.log("legalUsers", legalUsers);
  };

  const renderGenuineUsers = () => {
    let genuine = AllUsersData.filter((item: any) => item.type === "Genuine");
    setGenuineUsers(genuine);
    console.log("genuine", genuine);
  };

  useEffect(() => {
    AllUsers();
  }, [localUserId, localToken]);

  useEffect(() => {
    renderLegalUsers();
    renderGenuineUsers();
  }, [AllUsersData, type]);

  const renderSteps = () => {
    switch (type) {
      case "Legal":
        return (
          <LegalUsers
            LegalUsersData={legalUsers}
            legalUsersStatus={legalUsersStatus}
          />
        );
      case "Genuine":
        return <GenuineUsers GenuineUsersData={genuineUsers} />;
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
