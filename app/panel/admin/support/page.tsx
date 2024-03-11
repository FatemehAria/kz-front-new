"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import add from "../../../../public/Panel/addticket.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import checkmark from "../../../../public/Panel/checkmark.svg";
const Support = () => {
  const dispatch = useDispatch();
  const { localUserId, localToken } = useSelector(
    (state: any) => state.userData
  );
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const [allTickets, setAllTickets] = useState([]);
  const getAllTickets = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/AllTickets/${localUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setAllTickets(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localUserId) {
      getAllTickets();
    }
  }, [localUserId]);
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/panel/admin/support/add-new-placard"
        className="flex flex-row gap-2 bg-[#4866CE] text-white p-2 rounded-[4px] w-[120px]"
      >
        <span>اعلان جدید</span>
        <Image src={add} alt="add" />
      </Link>
      <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-5 text-center">
            <p>شماره</p>
            <p>عنوان</p>
            <p>وضعیت</p>
            <p>تاریخ بروزرسانی</p>
            <p>عملیات</p>
          </div>
          {allTickets.map((item: any, index) => (
            <Link
              key={item._id}
              className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
              href={`/panel/admin/support/ticket-detail?id=${item._id}`}
            >
              <p>{index + 1}</p>
              <p>{item.Title}</p>
              <p>{item.Blocked ? "بسته شده" : "بسته نشده"}</p>
              <p>*</p>
              <div className="flex flex-row justify-center gap-2">
                <Image src={checkmark} alt="" width={20} />
                <span>بستن</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
