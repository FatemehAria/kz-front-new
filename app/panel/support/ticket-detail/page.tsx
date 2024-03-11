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
import Chat from "./components/chat";
import { Bounce, toast } from "react-toastify";
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
        SenderText: data.data.text,
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
  // console.log(ticketDetail.SenderText);

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
      const { data } = await axios.put(
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
    <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full relative">
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
    </div>
  );
}

export default TicketDetail;
