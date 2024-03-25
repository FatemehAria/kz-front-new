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
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function AllProjects() {
  const { localToken, localUserId } = useSelector(
    (state: any) => state.userData
  );
  const dispatch = useDispatch();
  const [projectMangementData, setProjectMangementData] = useState([]);
  const [allProjectsStatus, setAllProjectsStatus] = useState({
    error: "",
    loading: false,
  });
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch(getIdFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);
  const AllProjects = async () => {
    try {
      setAllProjectsStatus((last) => ({ ...last, loading: true }));
      const { data } = await axios(
        `https://keykavoos.liara.run/Admin/AllProject/${localUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setProjectMangementData(data.data);
      setAllProjectsStatus((last) => ({ ...last, loading: false }));
      // console.log(data);
    } catch (error) {
      setAllProjectsStatus({ error: "خطا در دریافت اطلاعات", loading: false });
      // console.log(error);
    }
  };
  useEffect(() => {
    if (localUserId) {
      AllProjects();
    }
  }, [localUserId]);
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
      {allProjectsStatus.loading ? (
        <SkeletonTheme>
          <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
        </SkeletonTheme>
      ) : (
        projectMangementData.map((item: any, index) => (
          <div
            key={item._id}
            className="grid grid-cols-7 text-center py-1 bg-[#EAEFF6] rounded-[4px]"
          >
            <p className="font-faNum">{index + 1}</p>
            <p className="font-faNum">{item.Serial}</p>
            <p>{item.title}</p>
            <p className="font-faNum">{Number(item.budget).toLocaleString()}</p>
            <p>{item.type}</p>
            <p>
              {item.isConfirmationProject === "true"
                ? "تایید شده"
                : item.isConfirmationProject === "unknown"
                ? "نا معلوم"
                : "تایید نشده"}
            </p>
            <Link
              href={`/panel/admin/project-management/project-detail?id=${item._id}`}
              className="flex justify-center"
            >
              <Image src={vieweye} alt="مشاهده" width={20} height={20} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default AllProjects;
