"use client";
import {
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import { getProjectDetail } from "@/utils/utils";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImBackward, ImBackward2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const ProjectDetailNav = [
  "مشاوره",
  "ثبت سفارش",
  "دریافت فایل Brief",
  "پروپوزال",
  "تهیه زیرساخت",
  "طراحی وب",
  "تحویل وب",
];
function ProjectDetail() {
  const router = useRouter();
  const { token, localUserId } = useSelector((state: any) => state.userData);
  const [projectDetail, setProjectDetail] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
  }, []);

  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    getProjectDetail(token, id, setProjectDetail);
  }, []);

  return (
    <div className="relative">
      <div
        className="flex justify-end w-full text-xl cursor-pointer absolute -top-12"
        onClick={() => router.back()}
      >
        <div className="bg-white rounded-full p-2">
          <IoArrowBack />
        </div>
      </div>
      <ul className="grid grid-cols-7 justify-between bg-[#4866CE] text-white text-center rounded-t-2xl overflow-hidden">
        {ProjectDetailNav.map((item, index) => (
          <li
            key={index}
            className="hover:bg-[#EAEFF6] p-5 hover:text-[#4866CE] border border-[#4866CE]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetail;
