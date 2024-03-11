"use client";
import React, { useEffect, useState } from "react";
import TicketInfoField from "@/app/panel/support/ticket-detail/components/ticket-info-filed";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";

function TicketDetail() {
  const [ticketDetail, setTicketDetail] = useState({
    Title: "",
    Responsor: "",
    RelativeUnit: "",
    SentDate: "",
    RespondDate: "",
  });
  const { localUserId, localToken } = useSelector(
    (state: any) => state.userData
  );
  const params = useSearchParams();
  const id = params.get("id");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  const getTicketDetail = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/OneTicket/${localUserId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setTicketDetail({
        Title:data.data.Title,
        RelativeUnit:data.data.RelevantUnit,
        RespondDate:"",
        Responsor:"",
        SentDate:""
      })
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localUserId) {
      getTicketDetail();
    }
  }, [localUserId]);
  return (
    <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full">
      <div className="grid grid-cols-2 gap-[5%]">
        <TicketInfoField label="عنوان تیکت:" text={ticketDetail.Title} />
        <TicketInfoField
          label="مسئول پاسخگویی:"
          text={ticketDetail.Responsor}
        />
        <TicketInfoField
          label="واحد مربوطه تیکت:"
          text={ticketDetail.RelativeUnit}
        />
        <TicketInfoField
          label="تاریخ ارسال تیکت:"
          text={ticketDetail.SentDate}
        />
        <TicketInfoField
          label="تاریخ پاسخگویی:"
          text={ticketDetail.RespondDate}
        />
      </div>
      <div
        style={{
          border: "none",
          borderTop: "3px solid",
          borderImage:
            "linear-gradient(to right, #FFFFFF 0%, #4866CE 45% ,#4866CE 55% , #FFFFFF 100%) 1",
          margin: "5% 0",
        }}
      ></div>
    </div>
  );
}

export default TicketDetail;
