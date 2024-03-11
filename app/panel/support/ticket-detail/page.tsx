"use client";
import React, { useEffect, useState } from "react";
import TicketFields from "../add-new-ticket/components/ticket-fields";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import TicketInfoField from "./components/ticket-info-filed";
const moment = require("moment-jalaali");
function TicketDetail() {
  const [ticketDetail, setTicketDetail] = useState({
    Title: "",
    RelavantUnit: "",
    Responser: "",
    Sender: "",
    DateSend: "",
    DateAnswered: "",
  });
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const params = useSearchParams();
  const id = params.get("id");
  const getTicketInfo = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Client/OneTicket/${localUserId}/${id}`,
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      setTicketDetail({
        Title: data.data.Title,
        RelavantUnit: data.data.RelevantUnit,
        Responser: data.data.text.receiver,
        Sender: data.data.PhoneNumber,
        DateSend: data.data.createdAt,
        DateAnswered: data.data.RelevantUnit,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localUserId) {
      getTicketInfo();
    }
  }, [localUserId]);
  return (
    <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full">
      <div className="grid grid-cols-2 gap-5">
        <TicketInfoField label="عنوان تیکت:" text={ticketDetail.Title} />
        <TicketInfoField
          label="مسئول پاسخگویی:"
          text={ticketDetail.Responser}
        />
        <TicketInfoField
          label="واحد مربوطه تیکت:"
          text={ticketDetail.RelavantUnit}
        />
        <TicketInfoField label="فرستنده تیکت:" text={ticketDetail.Sender} />
        <TicketInfoField
          label="تاریخ ارسال تیکت:"
          text={moment(ticketDetail.DateSend).format("jYYYY/jMM/jDD")}
        />
        <TicketInfoField
          label="تاریخ پاسخگویی:"
          text={ticketDetail.DateAnswered}
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
