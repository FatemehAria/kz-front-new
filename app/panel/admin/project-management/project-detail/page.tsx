"use client";
import FileUpload from "@/app/panel/submit-order/components/file-upload";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

function ProjectDetail() {
  const [showRejectionReason, setShowRejectionReason] = useState(false);
  const [File, setFile] = useState<any>(null);
  const params = useSearchParams();
  const id = params.get("id");
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  const [projectDetail, setProjectDetail] = useState({
    title: "",
    type: "",
    plan: "",
    budget: "",
    Similar_Site: [],
    Description: "",
    Templates: [],
    Colors: [],
    Serial: "",
  });
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const handleFileChange = (file: File) => {
    setFile(file);
  };
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("File", File);
    // console.log(formData);
    console.log("Uploading File Name:", File.name);
    console.log("Uploading File Type:", File.type);
    try {
      const { data } = await axios.post(
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
  const getProjectDetail = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/OneProject/${localUserId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      console.log(data);
      setProjectDetail({
        title: data.data.title,
        type: data.data.type,
        plan: data.data.plan,
        budget: data.data.budget,
        Similar_Site: JSON.parse(data.data.Similar_Site),
        Description: data.data.Description,
        Templates: JSON.parse(data.data.Templates),
        Colors: JSON.parse(data.data.Colors),
        Serial: data.data.Serial,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localUserId) {
      getProjectDetail();
    }
    console.log(projectDetail);
  }, [localUserId]);

  const ConfirmProject = async () => {
    try {
      const { data } = await axios.post(
        `https://keykavoos.liara.run/Admin/confirmationProject/${localUserId}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      toast.success("پروژه تایید شد.", {
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
      toast.error("خطا در تایید پروژه.", {
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
      // console.log(error);
    }
  };
  return (
    <div>
      <div className="w-[210px] z-10">
        <div className="bg-[#4866CE] text-white rounded-t-lg relative right-1 top-1 py-2 px-2 flex justify-start items-center gap-2">
          <span>شماره درخواست:</span>
          <p className="font-faNum">{projectDetail.Serial}</p>
        </div>
      </div>
      <div className="py-[3%] w-full shadow mx-auto bg-white rounded-xl px-[3%] grid grid-cols-1 gap-5 relative">
        <div className="flex justify-end text-xl cursor-pointer absolute -top-12 left-0">
          <Link
            href="/panel/admin/project-management"
            className="bg-white rounded-full p-2"
          >
            <IoArrowBack />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <p>عنوان پروژه:</p>
              <div className="bg-[#EAEFF6] p-2 rounded-[4px]">
                {projectDetail.title}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">نوع پروژه:</label>
              <div className="bg-[#EAEFF6] p-2 rounded-[4px]">
                {projectDetail.type}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="">پلن انتخابی:</label>
              <div className="bg-[#EAEFF6] p-2 rounded-[4px]">
                {projectDetail.plan}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="">بودجه مورد نظر:</label>
              <div className="bg-[#EAEFF6] p-2 rounded-[4px] font-faNum">
                {Number(projectDetail.budget).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">سایت مشابه مورد نظر شماست:</label>
            <div className="bg-[#EAEFF6] p-2 rounded-[4px] flex gap-2 justify-end">
              {projectDetail.Similar_Site.map((item, index) => (
                <p
                  key={index}
                  className="bg-[#4866CE] text-white p-1 rounded-sm"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <label>توضیحات پروژه:</label>
              <div className="bg-[#EAEFF6] p-2 rounded-[4px]">
                {projectDetail.Description}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">قالب و افزونه های مورد نیاز:</label>
            <div className="bg-[#EAEFF6] p-2 rounded-[4px] flex gap-2 justify-end">
              {projectDetail.Templates.map((item, index) => (
                <p
                  key={index}
                  className="bg-[#4866CE] text-white p-1 rounded-sm"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">رنگ سازمانی:</label>
            <div className="bg-[#EAEFF6] p-2 rounded-[4px]">
              {projectDetail.Colors.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <FileUpload File={File} handleChange={handleFileChange} />
            <div className="bg-[#4866CE] text-white rounded-lg p-1 flex justify-start items-center gap-2">
              <label className="">
                {showRejectionReason ? "شماره درخواست:" : "مبلغ نهایی:"}
              </label>
              <input className="font-faNum bg-[#4866CE] text-white outline-none" />
            </div>
            <div className="w-full flex justify-end items-center gap-3">
              <button
                className="bg-[#EAEFF6] text-[#4866CE] rounded-lg py-1 px-3"
                onClick={() => setShowRejectionReason(true)}
              >
                رد پروژه
              </button>
              <button
                className="bg-[#4866CE] text-white rounded-lg p-1"
                onClick={() => ConfirmProject()}
              >
                تایید پروژه
              </button>
            </div>
          </div>
          {showRejectionReason && (
            <div className="relative">
              <textarea
                className="p-[1%] bg-[#EAEFF6] rounded-[4px] w-full placeholder:text-[#4866CE]"
                rows={4}
                placeholder="علت رد پروژه"
              ></textarea>
              <button className="bg-[#4866CE] text-white absolute left-2 bottom-5 rounded-[4px] p-2">
                تایید و ارسال به کارفرما
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
