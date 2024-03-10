"use client";
import FileUpload from "@/app/panel/submit-order/components/file-upload";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function ProjectDetail() {
  const params = useSearchParams();
  const id = params.get("id");
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  const [projectDetail, setProjectDetail] = useState([]);
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const getProjectDetail = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/AllProject/${localUserId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectDetail();
  }, []);
  return (
    <div className="relative w-full">
      <div className="flex justify-end text-xl cursor-pointer absolute -top-20 -left-10">
        <div className="bg-white rounded-full p-2">
          <IoArrowBack />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <p>عنوان پروژه:</p>
            <div className="bg-[#EAEFF6]"></div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">نوع پروژه:</label>
            <input className={"bg-[#EAEFF6]"} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <label htmlFor="">پلن انتخابی:</label>
            <input className={"bg-[#EAEFF6]"} />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">بودجه مورد نظر:</label>
            <input className={"bg-[#EAEFF6]"} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">سایت مشابه مورد نظر شماست:</label>
          <input className={"bg-[#EAEFF6]"} />
        </div>
        <div>
          <div className="flex flex-col gap-3">
            <label>توضیحات پروژه:</label>
            <textarea className="p-[2%] bg-[#EAEFF6] rounded-[4xl]"></textarea>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">قالب و افزونه های مورد نیاز:</label>
          <input className={"bg-[#EAEFF6]"} />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">رنگ سازمانی:</label>
          <input className={"bg-[#EAEFF6]"} />
        </div>
        <div className="grid grid-cols-3">
          <FileUpload />
          <div className="bg-[#4866CE] text-white rounded-lg p-1 flex justify-start items-center">
            شماره درخواست:
          </div>
          <div className="w-full flex justify-end items-center gap-3">
            <button className="bg-[#EAEFF6] text-[#4866CE] rounded-lg py-1 px-3">
              رد پروژه
            </button>
            <button className="bg-[#4866CE] text-white rounded-lg p-1">
              تایید پروژه
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea
            className="p-[2%] bg-[#EAEFF6] rounded-[4xl] w-full"
            rows={4}
          ></textarea>
          <button className="bg-[#4866CE] text-white absolute left-2 bottom-5 rounded-[4px] p-2">
            تایید و ارسال به کارفرما
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
