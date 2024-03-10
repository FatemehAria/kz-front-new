import Image from "next/image";
import React from "react";
import add from "../../../../public/Panel/addticket.svg";
import Link from "next/link";
const AllProjectsData = [
  {
    id: 1,
    title: "title",
    title1: "title1",
    title2: "title2",
    title3: "title3",
    title4: "title4",
  },
];
const Support = () => {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/panel/admin/support/add-new-placard"
        className="flex flex-row gap-2 bg-[#4866CE] text-white p-2 rounded-[4px] w-[120px]"
      >
        <span>اعلان جدید</span>
        <Image src={add} alt="add" />
      </Link>
      <div className="bg-white shadow mx-auto rounded-2xl py-[3%] px-[3%] w-full">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-5 text-center">
            <p>شماره</p>
            <p>عنوان</p>
            <p>وضعیت</p>
            <p>تاریخ بروزرسانی</p>
            <p>عملیات</p>
          </div>
          {AllProjectsData.map((item) => (
            <Link
              key={item.id}
              className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
              href={`/panel/support/ticket-detail?id=${item.id}`}
            >
              <p>{item.title}</p>
              <p>{item.title1}</p>
              <p>{item.title2}</p>
              <p>{item.title3}</p>
              <p>{item.title4}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
