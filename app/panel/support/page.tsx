"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import add from "../../../public/Panel/addticket.svg";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import checkmark from "../../../public/Panel/checkmark.svg";
import { useRouter, useSearchParams } from "next/navigation";
const moment = require("moment-jalaali");
const Support = () => {
  const router = useRouter();
  const [allTickets, setAllTickets] = useState([]);
  const params = useSearchParams();
  const id = params.get("id");
  console.log(id);
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const getAllTheTickets = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Client/AllTicket/${localUserId}`,
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      setAllTickets(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseTicket = async (ticketId: any) => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Client/CloseTicket/${localUserId}/${ticketId}`,
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      console.log(data);

      // Remove the id parameter from the URL
      const urlWithoutId = window.location.origin + window.location.pathname;
      window.history.replaceState(null, "", urlWithoutId);

      // Update the state to reflect the changes
      setAllTickets(allTickets.filter((item) => item._id !== ticketId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localUserId) {
      getAllTheTickets();
    }
  }, [localUserId]);
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/panel/support/add-new-ticket"
        className="flex flex-row gap-2 bg-[#4866CE] text-white p-2 rounded-[4px] w-[120px]"
      >
        <span>تیکت جدید</span>
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
              href={`/panel/support/ticket-detail?id=${item._id}`}
            >
              <p>{index + 1}</p>
              <p>{item.Title}</p>
              <p>{item.Blocked}</p>
              <p>
                {moment(item.updatedAt, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                  "jYYYY/jM/jD"
                )}
              </p>
              <Link href={`/panel/support?id=${item._id}`}>
                <div
                  className="flex flex-row justify-center gap-2"
                  onClick={() => handleCloseTicket(item._id)}
                >
                  <Image src={checkmark} alt="" width={20} />
                  <span>بستن</span>
                </div>
              </Link>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
