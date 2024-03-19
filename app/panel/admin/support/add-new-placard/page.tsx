"use client";
import React, { useEffect, useState } from "react";
import TicketFields from "./components/ticket-fields";
import SingleUser from "./single-user/page";
import GroupedUsers from "./grouped-users/page";
import NewPlacard from "./new-placard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";

function AddNewTicket() {
  const [UsersStatus, setUsersStatus] = useState({
    error: "",
    loading: false,
  });
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const [AllUsersData, setAllUsersData] = useState<any>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  const [steps, setSteps] = useState(0);
  const getAllUsers = async () => {
    try {
      setUsersStatus((last) => ({ ...last, loading: true }));
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/AllUser/${localUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setUsersStatus((last) => ({ ...last, loading: false }));
      setAllUsersData(data.data);
      console.log(data);
    } catch (error) {
      setUsersStatus({
        error: "خطا در نمایش اطلاعات",
        loading: false,
      });
      // console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const renderSteps = () => {
    switch (steps) {
      case 0:
        return <NewPlacard setSteps={setSteps} />;
      case 1:
        return <SingleUser AllUsers={AllUsersData} UsersStatus={UsersStatus} />;
      case 2:
        return <GroupedUsers AllUsers={AllUsersData} />;
      default:
        break;
    }
  };
  return (
    <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full">
      {renderSteps()}
    </div>
  );
}

export default AddNewTicket;
