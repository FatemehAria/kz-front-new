"use client";
import {
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { ImBackward, ImBackward2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
const ProjectDetailNav = [
  "ثبت سفارش",
  "تهیه زیرساخت",
  "طراحی UI",
  "Front",
  "Back",
  "دیپلوی",
  "تحویل موقت",
  "پشتیبانی",
];
function ProjectDetail() {
  const router = useRouter();
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIdFromLocal());
    dispatch(getTokenFromLocal());
  }, []);

  const params = useSearchParams();
  const id = params.get("id");

  const getProjectDetail = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Client/OneProject/${localUserId}/${id}`,
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
    if (localUserId) {
      getProjectDetail();
    }
  }, [localUserId]);
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
      <ul className="grid grid-cols-8 justify-between bg-[#4866CE] text-white text-center rounded-t-2xl overflow-hidden">
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
