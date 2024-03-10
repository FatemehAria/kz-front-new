"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";

type AllProjectsProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
function AllProjects({ setStep }: AllProjectsProps) {
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  const [projectMangementData, setProjectMangementData] = useState([]);
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const AllProjects = async () => {
    try {
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/AllProject/${localUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setProjectMangementData(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AllProjects();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-7 text-center">
        <p>ردیف</p>
        <p>شماره درخواست</p>
        <p>عنوان پروژه</p>
        <p>مبلغ پروژه</p>
        <p>نوع</p>
        <p>وضعیت</p>
        <p>مشاهده</p>
      </div>
      {projectMangementData.map((item, index) => (
        <div
          key={item._id}
          className="grid grid-cols-7 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
          //   onClick={() => setStep(2)}
        >
          <p>{index + 1}</p>
          <p>{item.Serial}</p>
          <p>{item.title}</p>
          <p>{item.budget}</p>
          <p>{item.type}</p>
          <p>{item.Financial_Situation}</p>
          <div className="flex justify-center" onClick={() => setStep(2)}>
            <Image src={vieweye} alt="مشاهده" width={20} height={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllProjects;
