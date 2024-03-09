import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import search from "../../../../public/ViewUsers/search.svg";
import Image from "next/image";
const SearchProjectData = [
  {
    id: 1,
    title: "پروژه یک",
    title1: "پروژه یک",
    title2: "پروژه یک",
    title3: "پروژه یک",
    title4: "پروژه یک",
    imgSrc: vieweye,
  },
  {
    id: 2,
    title: "پروژه یک",
    title1: "پروژه یک",
    title2: "پروژه یک",
    title3: "پروژه یک",
    title4: "پروژه یک",
    imgSrc: vieweye,
  },
];
function SearchProject() {
  return (
    <div className="flex flex-col gap-5 bg-white shadow mx-auto rounded-2xl w-full p-[3%]">
      <div className="flex flex-row gap-4 justify-between">
        <div className="relative mb-3 w-[50%]">
          <input
            type="text"
            placeholder="جستجو بر اساس شماره موبایل"
            className="w-full outline-none border border-[#4866CF] rounded-[8px] p-2"
          />
          <Image
            src={search}
            alt="search"
            className="absolute left-2 top-1/2 -translate-y-1/2"
          />
        </div>
        <div className="relative mb-3 w-[50%]">
          <input
            type="text"
            placeholder="جستجو بر اساس شماره درخواست"
            className="w-full outline-none border border-[#4866CF] rounded-[8px] p-2"
          />
          <Image
            src={search}
            alt="search"
            className="absolute left-2 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <div className="grid grid-cols-6 text-center">
        <p>شماره درخواست</p>
        <p>عنوان پروژه</p>
        <p>مبلغ پروژه</p>
        <p>نوع</p>
        <p>وضعیت</p>
        <p>مشاهده</p>
      </div>
      {SearchProjectData.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-6 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
          //   onClick={() => setStep(2)}
        >
          <p>{item.title}</p>
          <p>{item.title1}</p>
          <p>{item.title2}</p>
          <p>{item.title3}</p>
          <p>{item.title4}</p>
          <p className="flex justify-center">
            <Image src={item.imgSrc} alt="مشاهده" width={20} height={20} />
          </p>
        </div>
      ))}
    </div>
  );
}

export default SearchProject;
