"use client";
import {
  fetchUserProfile,
  getIdFromLocal,
  getTokenFromLocal,
} from "@/redux/features/user/userSlice";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../admin/components/NotFound";
import { getAllProjects } from "@/utils/utils";

function AllProjects() {
  const [allProjects, setAllProjects] = useState([]);
  const [projectStatus, setProjectStatus] = useState({
    error: "",
    loading: false,
  });
  const { token } = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTokenFromLocal());
    dispatch<any>(fetchUserProfile());
  }, []);

  useEffect(() => {
    getAllProjects(token, setAllProjects, setProjectStatus);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-4 text-center">
        <p>ردیف</p>
        <p>عنوان پروژه</p>
        <p>وضعیت پیشرفت پروژه</p>
        <p>وضعیت مالی پروژه</p>
        {/* <p>درخواست فاکتور</p> */}
      </div>
      {projectStatus.loading ? (
        <SkeletonTheme>
          <Skeleton count={1} className="p-3" baseColor="#EAEFF6" />
        </SkeletonTheme>
      ) : projectStatus.error ? (
        <NotFound text={projectStatus.error} />
      ) : (
        allProjects.map((item: any, index) => (
          <Link
            key={item.id}
            className="grid grid-cols-4 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
            href={`/panel/user/project-management/project-detail?id=${item.id}`}
          >
            <p>{index + 1}</p>
            <p>{item.title}</p>
            <p>
              {item.status === "processing"
                ? "در حال بررسی"
                : item.status === "verified"
                ? "تایید شده"
                : "تایید نشده"}
            </p>
            <p>{item.final_price === null ? "نامعلوم" : ""}</p>
          </Link>
        ))
      )}
    </div>
  );
}

export default AllProjects;
