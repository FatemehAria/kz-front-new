"use client";
import React, { useEffect, useState } from "react";
import PersonalInfoHeader from "../../personal-info/components/personal-info-header";
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
  const [type, setType] = useState("");
  const [AllUsersData, setAllUsersData] = useState([]);
  const [legalUsers, setLegalUsers] = useState([]);
  const [genuineUsers, setGenuineUsers] = useState([]);

  const AllUsers = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/AllUser/${localUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setAllUsersData(JSON.parse(JSON.stringify(data.data)));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderLegalUsers = async () => {
    // try {
    let legal = await AllUsersData.filter((item) => item.type === "Legal");
    setLegalUsers(legal);
    if (legal.length > 0) {
      setType("Legal");
    }
    console.log("legalUsers", legalUsers);
    // } catch (error) {}
  };

  const renderGenuineUsers = async () => {
    // try {
    let genuine = await AllUsersData.filter((item) => item.type === "Genuine");
    setGenuineUsers(genuine);
    if (genuine.length > 0) {
      setType("Genuine");
    }
    console.log("genuine", genuine);
    // } catch (error) {}
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
        return <LegalUsers LegalUsersData={legalUsers} />;
      case "Genuine":
        return <GenuineUsers GenuineUsersData={genuineUsers} />;
      default:
        return;
    }
  };
  return (
    <div className="grid grid-cols-1 gap-10 w-full">
      <PersonalInfoHeader step={type} setStep={setType} />
      <div className={`bg-white shadow mx-auto rounded-2xl w-full p-[3%]`}>
        {renderSteps()}
      </div>
    </div>
  );
}

export default ViewUsers;
