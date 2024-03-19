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
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import CloseTicketModal from "./components/close-ticket-modal";
const moment = require("moment-jalaali");
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
  const [allTicketsStatus, setAllTicketsStatus] = useState({
    error: "",
    loading: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [closeTicketId, setCloseTicketId] = useState("");
  const getAllTickets = async () => {
    try {
      setAllTicketsStatus((last) => ({ ...last, loading: true }));
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/AllTickets/${localUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setAllTickets(data.data);
      setAllTicketsStatus((last) => ({ ...last, loading: false }));
      console.log(data);
    } catch (error) {
      setAllTicketsStatus({ error: "خطا در خواندن اطلاعات", loading: false });
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
          {allTicketsStatus.loading ? (
            <SkeletonTheme>
              <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
            </SkeletonTheme>
          ) : (
            allTickets.map((item: any, index) => (
              <div
                key={item._id}
                className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px]"
              >
                <p>{index + 1}</p>
                <p>{item.Title}</p>
                <p>{item.Blocked ? "بسته شده" : "بسته نشده"}</p>
                <p>
                  {moment(item.updatedAt, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                    "jYYYY/jM/jD"
                  )}
                </p>
                <div className="flex flex-row justify-center gap-2">
                  {!item.Blocked && (
                    <Image
                      src={checkmark}
                      alt="بستن"
                      width={20}
                      onClick={() => (
                        setShowModal(true), setCloseTicketId(item._id)
                      )}
                      className="cursor-pointer"
                    />
                  )}
                  <Link
                    href={`/panel/admin/support/ticket-detail?id=${item._id}`}
                  >
                    <Image src={vieweye} alt="مشاهده" width={20} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
