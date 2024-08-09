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
import { IoArrowBack } from "react-icons/io5";
import { getTicektDetail } from "@/utils/utils";
import app from "@/services/service";
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
  const [fileSelected, setFileSelected] = useState(false);
  const [textInput, setTextInput] = useState("");
  const { token, localUserId, userProfile } = useSelector(
    (state: any) => state.userData
  );
  const [path, setPath] = useState("");
  const dispatch = useDispatch();

  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  const getTicketDetail = async () => {
    try {
      setTicketDetailStatus((prevStatus) => ({ ...prevStatus, loading: true }));
      const { data } = await app(`/ticket/show/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setTicketDetail({
        Title: data.data.title,
        RelavantUnit: data.data.department.name_fa,
        Responser: "ادمین",
        Sender:
          data.data.register_user.name + " " + data.data.register_user.surname,
        DateSend: moment(
          data.data.created_at,
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ).format("jYYYY/jM/jD"),
        DateAnswered: "-",
        SenderText: [data.data.description],
        Blocked: data.data.status.title_en,
      });
      setTicketDetailStatus((prevStatus) => ({
        ...prevStatus,
        loading: false,
      }));
      console.log("ticketdetail", data);
    } catch (error) {
      setTicketDetailStatus({ error: "", loading: false });
    }
  };

  const [File, setFile] = useState<any>(null);
  const handleFileChange = (file: File) => {
    setFile(file);
    setFileSelected(true);
  };
  
  const sendResponseTicket = async () => {
    try {
      const { data } = await app.post(
        `/ticket/store`,
        {
          title: ticketDetail.Title,
          description: ticketDetail.SenderText,
          status_id: 1,
          priority_id: 1,
          register_user_id: userProfile.id,
          dept_id: ticketDetail.RelavantUnit,
          ticket_id: Number(id),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedSenderText = updateSenderBox(textInput);
      setTicketDetail((prevTicketDetail: any) => ({
        ...prevTicketDetail,
        SenderText: updatedSenderText,
      }));
      toast.success("تیکت با موفقیت آپدیت شد.", {
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
      console.log(data);
    } catch (error: any) {
      toast.error("خطا در آپدیت تیکت.", {
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
      console.log(error.response.data.message);
    }
  };
  const handleFileUpload = async () => {};

  const updateSenderBox = (newText: string) => {
    const updatedSenderText = [...ticketDetail.SenderText, newText];
    return updatedSenderText;
  };

  useEffect(() => {
    getTicketDetail();
  }, []);

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
        <Chat
          senderText={ticketDetail.SenderText}
          recieverText={"this is the reciever text"}
          textInput={textInput}
          setTextInput={setTextInput}
          File={File}
          handleFileChange={handleFileChange}
          handleFileUpload={handleFileUpload}
          sendResponseTicket={sendResponseTicket}
          fileSelected={fileSelected}
        />
      </div>
    </div>
  );
}

export default TicketDetail;
