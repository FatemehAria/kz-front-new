import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
import search from "../../../../public/ViewUsers/search.svg";
const SearchGenuineData = [
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
function SearchGenuine() {
  return (
    <div>
      <div className="relative mb-3">
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
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-6 text-center">
          <p>ردیف</p>
          <p>نام سازمان</p>
          <p>شماره ملی</p>
          <p>شماره موبایل </p>
          <p>شماره ثبت</p>
          <p>مشاهده</p>
        </div>
        {SearchGenuineData.map((item) => (
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
            <div className="flex justify-center">
              <Image src={item.imgSrc} alt="مشاهده" width={20} height={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchGenuine;
