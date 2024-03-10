"use client";
import Link from "next/link";
import React, { useEffect } from "react";
type AllProjectsProps = {
  AllProjectsData: SingleProjectInfo[];
  getAllProjects: () => Promise<void>;
};
type SingleProjectInfo = {
  id: number;
  title: string;
  title1: string;
  title2: string;
  title3: string;
  title4: string;
};
function AllProjects({ AllProjectsData, getAllProjects }: AllProjectsProps) {
  useEffect(() => {
    getAllProjects();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-5 text-center">
        <p>ردیف</p>
        <p>عنوان پروژه</p>
        <p>وضعیت پیشرفت پروژه</p>
        <p>وضعیت مالی پروژه</p>
        <p>درخواست فاکتور</p>
      </div>
      {AllProjectsData.map((item) => (
        <Link
          key={item.id}
          className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
          href={`/panel/project-management/project-detail?id=${item.id}`}
        >
          <p>{item.title}</p>
          <p>{item.title1}</p>
          <p>{item.title2}</p>
          <p>{item.title3}</p>
          <p>{item.title4}</p>
        </Link>
      ))}
    </div>
  );
}

export default AllProjects;
