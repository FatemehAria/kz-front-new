"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import add from "../../../../public/Panel/addticket.svg";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import checkmark from "../../../../public/Panel/checkmark.svg";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import CloseTicketModal from "./components/close-ticket-modal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NotFound from "../../admin/components/NotFound";
import { getAllTickets } from "@/utils/utils";
const moment = require("moment-jalaali");

const Support = () => {
  const [showModal, setShowModal] = useState(false);
  const [allTickets, setAllTickets] = useState([]);
  const [closeTicketId, setCloseTicketId] = useState("");
  const [supportStatus, setSupportStatus] = useState({
    error: "",
    loading: false,
  });
  const { token, localUserId } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  useEffect(() => {
    getAllTickets(token, setAllTickets, setSupportStatus);
  }, []);
  // useEffect(() => {
  //   if (localUserId) {
  //     getAllTheTickets();
  //   }
  // }, [localUserId]);
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
        href="/panel/user/support/add-new-ticket"
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
            <p>تاریخ به روزرسانی</p>
            <p>عملیات</p>
          </div>
          {supportStatus.loading ? (
            <SkeletonTheme>
              <Skeleton count={1} className="p-3" baseColor="#EAEFF6" />
            </SkeletonTheme>
          ) : supportStatus.error ? (
            <NotFound text={supportStatus.error} />
          ) : (
            allTickets.map((item: any, index) => (
              <div
                key={item.id}
                className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px]"
              >
                <p className="font-faNum">{index + 1}</p>
                <p className="font-faNum">{item.title}</p>
                {/* item.priority_id */}
                <div>
                  {item.Blocked === "true" ? (
                    <p>
                      بسته{" "}
                      <span className="text-emerald-600 font-semibold">
                        شده
                      </span>
                    </p>
                  ) : (
                    <p>
                      بسته{" "}
                      <span className="text-red-400 font-semibold">نشده</span>
                    </p>
                  )}
                </div>
                <p className="font-faNum">
                  {moment(item.updated_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                    "jYYYY/jM/jD"
                  )}
                </p>
                <Link href={`/panel/user/support/ticket-detail?id=${item.id}`} className="flex justify-center">
                  <Image src={vieweye} alt="مشاهده" width={20} />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
