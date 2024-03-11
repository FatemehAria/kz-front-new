"use client";
import React, { useEffect, useState } from "react";
import TicketFields from "./components/ticket-fields";
import FileUpload from "../../submit-order/components/file-upload";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { Bounce, toast } from "react-toastify";

function AddNewTicket() {
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const [File, setFile] = useState<any>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  const handleFileChange = (file: File) => {
    setFile(file);
  };
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("File", File);
    // console.log(formData);
    try {
      const { data } = await axios.put(
        `https://keykavoos.liara.run/Client/UploadFileTicket/${localUserId}`,
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

  const [ticket, setTicket] = useState({
    RelevantUnit: "",
    Title: "",
    text: "",
    Priority: "",
  });
  const SubmitTicket = async (
    RelevantUnit: string,
    Title: string,
    text: string,
    Priority: string,
    File: any
  ) => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Client/submitTicket/${localUserId}`,
        {
          RelevantUnit,
          Title,
          text,
          Priority,
          File,
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

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await handleFileUpload()
    await SubmitTicket(
      ticket.RelevantUnit,
      ticket.Title,
      ticket.text,
      ticket.Priority,
      JSON.stringify(File)
    );
    // Promise.all([
    //   await handleFileUpload(),
    //   await SubmitTicket(
    //     ticket.RelevantUnit,
    //     ticket.Title,
    //     ticket.text,
    //     ticket.Priority,
    //     File
    //   ),
    // ]);
  };
  return (
    <form
      onSubmit={(e) => handleSubmission(e)}
      className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full grid grid-cols-1 gap-3"
    >
      <TicketFields
        label="عنوان تیکت:"
        width="30%"
        value={ticket.Title}
        onChange={(e) =>
          setTicket((last) => ({ ...last, Title: e.target.value }))
        }
      />
      <TicketFields
        label="واحد مربوطه:"
        width="30%"
        value={ticket.RelevantUnit}
        onChange={(e) =>
          setTicket((last) => ({ ...last, RelevantUnit: e.target.value }))
        }
      />
      <TicketFields
        label="اولویت تیکت:"
        width="30%"
        value={ticket.Priority}
        onChange={(e) =>
          setTicket((last) => ({ ...last, Priority: e.target.value }))
        }
      />
      <div
        style={{
          border: "none",
          borderTop: "3px solid",
          borderImage:
            "linear-gradient(to right, #FFFFFF 0%, #4866CE 45% ,#4866CE 55% , #FFFFFF 100%) 1",
          margin: "3% 0",
        }}
      ></div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <label htmlFor="">متن تیکت:</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="p-2 bg-[#EAEFF6] w-[30%] rounded-[4px]"
            value={ticket.text}
            onChange={(e) =>
              setTicket((last) => ({ ...last, text: e.target.value }))
            }
          ></textarea>
        </div>
        <FileUpload handleChange={handleFileChange} File={File} />
      </div>
      <div className="flex justify-end">
        <button className="bg-[#4866CE] text-white p-2 rounded-[4px]">
          ارسال تیکت
        </button>
      </div>
    </form>
  );
}

export default AddNewTicket;
