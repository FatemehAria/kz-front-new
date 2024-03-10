"use client";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserDetail() {
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const params = useSearchParams();
  const id = params.get("id");
  console.log("id",id);
  console.log("userId",localUserId);
  const [userDetail, setUserDetail] = useState([]);
  const getUserDetail = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/OneUser/${localUserId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      //   setUserDetail(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  useEffect(() => {
    getUserDetail();
  }, []);
  return <div>UserDetail</div>;
}

export default UserDetail;
