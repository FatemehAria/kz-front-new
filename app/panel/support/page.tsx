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
import { useSearchParams } from "next/navigation";
import vieweye from "../../../public/ViewUsers/vieweye.svg";
import CloseTicketModal from "./components/close-ticket-modal";

const moment = require("moment-jalaali");
const Support = () => {
  const [showModal, setShowModal] = useState(false);
  const [allTickets, setAllTickets] = useState([]);
  const [closeTicketId, setCloseTicketId] = useState("");

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

  useEffect(() => {
    if (localUserId) {
      getAllTheTickets();
    }
  }, [localUserId]);
  return (
    <div className="flex flex-col gap-3">
      {showModal && (
        <CloseTicketModal
          showModal={showModal}
          setShowModal={setShowModal}
          text={`آیا از بستن تیکت مطمئنید؟`}
          setAllTickets={setAllTickets}
          closeTicketId={closeTicketId}
        />
      )}
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
            <div
              key={item._id}
              className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
            >
              <p>{index + 1}</p>
              <p>{item.Title}</p>
              <p>
                {item.Blocked === "true" ? (
                  <p>
                    بسته{" "}
                    <span className="text-emerald-600 font-semibold">شده</span>
                  </p>
                ) : (
                  <p>
                    بسته{" "}
                    <span className="text-red-400 font-semibold">نشده</span>
                  </p>
                )}
              </p>
              <p>
                {moment(item.updatedAt, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                  "jYYYY/jM/jD"
                )}
              </p>
              <div className="flex justify-center items-center gap-5">
                {item.Blocked !== "true" && (
                  <div>
                    <div
                      onClick={() => (
                        setShowModal(true), setCloseTicketId(item._id)
                      )}
                    >
                      <Image src={checkmark} alt="بستن" width={20} />
                    </div>
                  </div>
                )}
                <Link href={`/panel/support/ticket-detail?id=${item._id}`}>
                  <Image src={vieweye} alt="مشاهده" width={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
