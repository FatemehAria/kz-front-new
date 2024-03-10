"use client";
import React, { useEffect, useState } from "react";
import SearchLegal from "./search-legal";
import SearchGenuine from "./search-genuine";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import SearchUserHeader from "./components/search-user-header";

function SearchUser() {
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const [legalUsers, setLegalUsers] = useState([]);
  const [searchLegalUser, setSearchLegalUser] = useState("");
  const [genuineUsers, setGenuineUsers] = useState([]);
  const [searchGenuineUser, setSearchGenuineUser] = useState("");
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const [AllUsersData, setAllUsersData] = useState<any>([]);

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

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SearchGenuine
            GenuineUsers={genuineUsers}
            value={searchGenuineUser}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchGenuineUser(e.target.value)
            }
          />
        );
      case 2:
        return (
          <SearchLegal
            LegalUsers={legalUsers}
            value={searchLegalUser}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchLegalUser(e.target.value)
            }
          />
        );
      default:
        return;
    }
  };

  useEffect(() => {
    AllUsers();
  }, [localUserId, localToken]);

  useEffect(() => {
    renderLegalUsers();
    renderGenuineUsers();
  }, [AllUsersData]);
  return (
    <div className="grid grid-cols-1 gap-10 w-full">
      <SearchUserHeader setStep={setStep} step={step} />
      <div className={`bg-white shadow mx-auto rounded-2xl w-full p-[3%]`}>
        {renderSteps()}
      </div>
    </div>
  );
}

export default SearchUser;
