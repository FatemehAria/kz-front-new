"use client";
import React, { useEffect, useState } from "react";
import TicketInfoField from "@/app/panel/support/ticket-detail/components/ticket-info-filed";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import Chat from "./components/chat";
const moment = require("moment-jalaali");
function TicketDetail() {
  const [ticketDetail, setTicketDetail] = useState({
    Title: "",
    Responsor: "",
    RelativeUnit: "",
    SentDate: "",
    RespondDate: "",
    SenderText: [],
  });
  const { localUserId, localToken } = useSelector(
    (state: any) => state.userData
  );
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const [ticketDetailStatus, setTicketDetailStatus] = useState({
    error: "",
    loading: false,
  });
  const [textInput, setTextInput] = useState("");
  const getTicketDetail = async () => {
    try {
      setTicketDetailStatus((last) => ({ ...last, loading: true }));
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/OneTicket/${localUserId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setTicketDetail({
        Title: data.data.Title,
        RelativeUnit: data.data.RelevantUnit,
        RespondDate: "",
        Responsor: "",
        SentDate: moment(
          data.data.createdAt,
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ).format("jYYYY/jM/jD"),
        SenderText: data.data.text,
      });
      setTicketDetailStatus((last) => ({ ...last, loading: false }));
      console.log(data);
    } catch (error) {
      setTicketDetailStatus({ error: "خطا در خواندن اطلاعات", loading: false });
      console.log(error);
    }
  };
  const updateSenderBox = (newText: string) => {
    const updatedSenderText = [
      ...ticketDetail.SenderText,
      { content: newText },
    ];
    return updatedSenderText;
  };
  const sendResponseTicket = async (textInput: string) => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Admin/ResponseTicket/${localUserId}/${id}`,
        {
          text: textInput,
        },
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      const updatedSenderText = updateSenderBox(textInput);
      setTicketDetail((prevTicketDetail: any) => ({
        ...prevTicketDetail,
        SenderText: updatedSenderText,
      }));
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
    <div>
      <div
        className="flex justify-end w-full text-xl cursor-pointer absolute -top-12"
        onClick={() => router.back()}
      >
        <div className="rounded-full p-2 bg-white">
          <IoArrowBack />
        </div>
      </div>

      <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full">
        <div className="grid grid-cols-2 gap-[5%]">
          <TicketInfoField
            label="عنوان تیکت:"
            text={ticketDetail.Title}
            ticketDetailStatus={ticketDetailStatus.loading}
          />
          <TicketInfoField
            label="مسئول پاسخگویی:"
            text={ticketDetail.Responsor}
            ticketDetailStatus={ticketDetailStatus.loading}
          />
          <TicketInfoField
            label="واحد مربوطه تیکت:"
            text={ticketDetail.RelativeUnit}
            ticketDetailStatus={ticketDetailStatus.loading}
          />
          <TicketInfoField
            label="تاریخ ارسال تیکت:"
            text={ticketDetail.SentDate}
            ticketDetailStatus={ticketDetailStatus.loading}
          />
          <TicketInfoField
            label="تاریخ پاسخگویی:"
            text={ticketDetail.RespondDate}
            ticketDetailStatus={ticketDetailStatus.loading}
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
        <Chat
          senderText={ticketDetail.SenderText}
          textInput={textInput}
          setTextInput={setTextInput}
          sendResponseTicket={sendResponseTicket}
        />
      </div>
    </div>
  );
}

export default TicketDetail;
