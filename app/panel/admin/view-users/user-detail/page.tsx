"use client";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function UserDetail() {
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const params = useSearchParams();
  const id = params.get("id");
  console.log("id", id);
  console.log("userId", localUserId);
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
  return (
    <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] relative">
      <Link
        className="flex justify-end text-xl cursor-pointer absolute left-0 -top-12"
        href="/panel/admin/view-users"
      >
        <div className="bg-white rounded-full p-2">
          <IoArrowBack />
        </div>
      </Link>
      UserDetail
    </div>
  );
}

export default UserDetail;
