"use client";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AllProjects() {
  const [allProjects, setAllProjects] = useState([]);
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const getAllProjects = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Client/AllProject/${localUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setAllProjects(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localUserId) {
      getAllProjects();
    }
  }, [localUserId]);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-5 text-center">
        <p>ردیف</p>
        <p>عنوان پروژه</p>
        <p>وضعیت پیشرفت پروژه</p>
        <p>وضعیت مالی پروژه</p>
        <p>درخواست فاکتور</p>
      </div>
      {allProjects.map((item: any,index) => (
        <Link
          key={item._id}
          className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
          href={`/panel/project-management/project-detail?id=${item._id}`}
        >
          <p>{index + 1}</p>
          <p>{item.title}</p>
          <p>{item.Development === "Not Started" ? "شروع نشده" : ""}</p>
          <p>{item.Financial_Situation === "unknown" ? "نامعلوم" : ""}</p>
        </Link>
      ))}
    </div>
  );
}

export default AllProjects;
