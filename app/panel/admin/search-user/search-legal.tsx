import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
const SearchLegalData = [
  {
    id: 1,
    title: "پروژه یک",
    title1: "پروژه یک",
    title2: "پروژه یک",
    title3: "پروژه یک",
    imgSrc: vieweye,
  },
  {
    id: 2,
    title: "پروژه یک",
    title1: "پروژه یک",
    title2: "پروژه یک",
    title3: "پروژه یک",
    imgSrc: vieweye,
  },
];

function SearchLegal() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-5 text-center">
        <p>ردیف</p>
        <p>شماره موبایل</p>
        <p>نام و نام خانوادگی</p>
        <p>ایمیل</p>
        <p>مشاهده</p>
      </div>
      {SearchLegalData.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
          //   onClick={() => setStep(2)}
        >
          <p>{item.title}</p>
          <p>{item.title1}</p>
          <p>{item.title2}</p>
          <p>{item.title3}</p>
          <div className="flex justify-center">
            <Image src={item.imgSrc} alt="مشاهده" width={20} height={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchLegal;
