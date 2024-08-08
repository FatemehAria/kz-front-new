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
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import AboutMeEducationDropdown from "@/app/panel/components/about-me-education-dropsown";
import SubmitOrderDropdown from "../../submit-order/components/submit-order-dropdown";
import { createTicket } from "@/utils/utils";

function AddNewTicket() {
  const { localToken, localUserId , token } = useSelector(
    (state: any) => state.userData
  );
  const [File, setFile] = useState<any>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const router = useRouter();
  const handleFileChange = (file: File) => {
    setFile(file);
    setFileSelected(true);
  };
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", File);
    try {
      const { data } = await axios.post(
        `/ticket/file/upload/${localUserId}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        }
      );
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
    title: "",
    description: "",
    // ?
    status_id:"",
    priority_id: "",
    // userId
    register_user_id: "",
    dept_id:"",
    // ?
    ticket_id:""
  });

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Promise.all([
      await handleFileUpload(),
      // await createTicket(
      //   token,
      //   ticket.Title,
      //   ticket.RelevantUnit,
      //   ticket.text,
      //   ticket.Priority,
      //   JSON.stringify(File)
      // ),
    ]);
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
      <form
        onSubmit={(e) => handleSubmission(e)}
        className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full grid grid-cols-1 gap-3"
      >
        <TicketFields
          label="عنوان تیکت:"
          width="30%"
          value={ticket.title}
          onChange={(e) =>
            setTicket((last) => ({ ...last, Title: e.target.value }))
          }
        />
        <TicketFields
          label="واحد مربوطه:"
          width="30%"
          value={ticket.dept_id}
          onChange={(e) =>
            setTicket((last) => ({ ...last, RelevantUnit: e.target.value }))
          }
        />
        <div className="w-[30%]">
          <SubmitOrderDropdown
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTicket((last) => ({ ...last, Priority: e.target.value }))
            }
            value={ticket.priority_id}
            dropDownTitle="اولویت تیکت:"
            dropdownItems={["کم", "متوسط", "فوری"]}
          />
        </div>
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
              value={ticket.description}
              onChange={(e) =>
                setTicket((last) => ({ ...last, text: e.target.value }))
              }
            ></textarea>
          </div>
          <FileUpload handleChange={handleFileChange} File={File} />
        </div>
        <div className="flex justify-end">
          <button
            className={`${"bg-[#4866CE]"} text-white p-2 rounded-[4px]`}
            // disabled={fileSelected === true ? false : true}
          >
            ارسال تیکت
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewTicket;
