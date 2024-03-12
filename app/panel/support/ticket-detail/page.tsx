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
import { useRouter, useSearchParams } from "next/navigation";
import TicketInfoField from "./components/ticket-info-filed";
import Chat from "./components/chat";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
const moment = require("moment-jalaali");
function TicketDetail() {
  const [ticketDetail, setTicketDetail] = useState({
    Title: "",
    RelavantUnit: "",
    Responser: "",
    Sender: "",
    DateSend: "",
    DateAnswered: "",
    SenderText: [],
    Blocked: "",
  });
  const [ticketDetailStatus, setTicketDetailStatus] = useState({
    error: "",
    loading: false,
  });
  const [textInput, setTextInput] = useState("");
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
  const router = useRouter();
  const getTicketInfo = async () => {
    try {
      setTicketDetailStatus((prevStatus) => ({ ...prevStatus, loading: true }));
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
        DateSend: moment(
          data.data.createdAt,
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ).format("jYYYY/jM/jD"),
        DateAnswered: data.data.RelevantUnit,
        SenderText: data.data.text,
        Blocked: data.data.Blocked,
      });
      setTicketDetailStatus((prevStatus) => ({
        ...prevStatus,
        loading: false,
      }));
      console.log(data.data.createdAt);
      console.log(data);
    } catch (error) {
      setTicketDetailStatus({ error: "", loading: false });
      // console.log(error);
    }
  };
  useEffect(() => {
    if (localUserId) {
      getTicketInfo();
    }
  }, [localUserId]);

  const [File, setFile] = useState<any>(null);
  const handleFileChange = (file: File) => {
    setFile(file);
  };
  const sendResponseTicket = async (textInput: string) => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Client/ResponseTicket/${localUserId}/${id}`,
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
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("File", File);
    // console.log(formData);
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Client/UploadFileResponseTicket/${localUserId}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
      // console.log(selectedFile);
      console.log(formData);
      console.log(data);
      toast.success("آپلود فایل موفق بود.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
    } catch (error) {
      toast.error("خطا در آپلود فایل، لطفا مجدد آپلود کنید.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
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
  return (
    <div className="relative">
      <div
        className="flex justify-end w-full text-xl cursor-pointer absolute -top-12"
        onClick={() => router.back()}
      >
        <div className="rounded-full p-2 bg-white">
          <IoArrowBack />
        </div>
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full relative">
        <div className="grid grid-cols-2 gap-5">
          <TicketInfoField
            label="عنوان تیکت:"
            text={ticketDetail.Title}
            ticketDetailStatus={ticketDetailStatus.loading}
          />
          <TicketInfoField
            label="مسئول پاسخگویی:"
            text={ticketDetail.Responser}
            ticketDetailStatus={ticketDetailStatus.loading}
          />
          <TicketInfoField
            label="واحد مربوطه تیکت:"
            text={ticketDetail.RelavantUnit}
            ticketDetailStatus={ticketDetailStatus.loading}
          />
          <TicketInfoField
            label="فرستنده تیکت:"
            text={ticketDetail.Sender}
            ticketDetailStatus={ticketDetailStatus.loading}
          />
          <TicketInfoField
            label="تاریخ ارسال تیکت:"
            text={ticketDetail.DateSend}
            ticketDetailStatus={ticketDetailStatus.loading}
          />
          <TicketInfoField
            label="تاریخ پاسخگویی:"
            text={ticketDetail.DateAnswered}
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
        {ticketDetail.Blocked === "false" && (
          <Chat
            senderText={ticketDetail.SenderText}
            recieverText={"this is the reciever text"}
            textInput={textInput}
            setTextInput={setTextInput}
            updateSenderText={updateSenderBox}
            File={File}
            handleFileChange={handleFileChange}
            handleFileUpload={handleFileUpload}
            sendResponseTicket={sendResponseTicket}
          />
        )}
      </div>
    </div>
  );
}

export default TicketDetail;
