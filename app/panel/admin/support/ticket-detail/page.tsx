"use client";
import React, { useEffect, useState } from "react";
import TicketInfoField from "@/app/panel/user/support/ticket-detail/components/ticket-info-filed";
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
import { Bounce, toast } from "react-toastify";
const moment = require("moment-jalaali");

function TicketDetail() {
  const [ticketDetail, setTicketDetail] = useState({
    Title: "",
    Responsor: "",
    RelativeUnit: "",
    SentDate: "",
    RespondDate: "",
    SenderText: [],
    Blocked: "",
  });
  const [ticketDetailStatus, setTicketDetailStatus] = useState({
    error: "",
    loading: false,
  });
  const [textInput, setTextInput] = useState("");
  const { localUserId, localToken } = useSelector(
    (state: any) => state.userData
  );
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const [path, setPath] = useState("");
  const params = useSearchParams();
  const id = params.get("id");
  const [File, setFile] = useState<any>(null);
  const handleFileChange = (file: File) => {
    setFile(file);
  };
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
        RespondDate: "-",
        Responsor: "ادمین",
        SentDate: moment(
          data.data.createdAt,
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ).format("jYYYY/jM/jD"),
        SenderText: data.data.text,
        Blocked: data.data.Blocked,
      });
      setTicketDetailStatus((last) => ({ ...last, loading: false }));
      console.log(data);
    } catch (error) {
      setTicketDetailStatus({ error: "خطا در خواندن اطلاعات", loading: false });
      console.log(error);
    }
  };
  useEffect(() => {
    if (localUserId) {
      getTicketDetail();
    }
  }, [localUserId]);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("File", File);
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
      setPath(data.data);
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
      setFile("");
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
  const sendResponseTicket = async (textInput: string) => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Admin/ResponseTicket/${localUserId}/${id}`,
        {
          text: textInput,
          path,
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
    } catch (error) {
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
      console.log(error);
    }
  };
  const updateSenderBox = (newText: string) => {
    const updatedSenderText = [
      ...ticketDetail.SenderText,
      { content: newText, sender: "Admin", timestamp: new Date().getTime() },
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
        {ticketDetail.Blocked === "false" && (
          <div
            style={{
              border: "none",
              borderTop: "3px solid",
              borderImage:
                "linear-gradient(to right, #FFFFFF 0%, #4866CE 45% ,#4866CE 55% , #FFFFFF 100%) 1",
              margin: "5% 0",
            }}
          ></div>
        )}
        {ticketDetail.Blocked === "false" && (
          <Chat
            senderText={ticketDetail.SenderText}
            textInput={textInput}
            setTextInput={setTextInput}
            sendResponseTicket={sendResponseTicket}
            handleFileChange={handleFileChange}
            handleFileUpload={handleFileUpload}
            File={File}
            updateSenderText={updateSenderBox}
          />
        )}
      </div>
    </div>
  );
}

export default TicketDetail;
