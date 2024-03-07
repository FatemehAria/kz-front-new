import Image from "next/image";
import React from "react";
import vieweye from "../../../../public/ViewUsers/vieweye.svg";
const ProjectMangementData = [
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
type AllProjectsProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
function AllProjects({ setStep }: AllProjectsProps) {
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
      {ProjectMangementData.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-7 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
          //   onClick={() => setStep(2)}
        >
          <p>{item.title}</p>
          <p>{item.title1}</p>
          <p>{item.title2}</p>
          <p>{item.title3}</p>
          <p>{item.title3}</p>
          <p>{item.title3}</p>
          <div className="flex justify-center" onClick={() => setStep(2)}>
            <Image src={item.imgSrc} alt="مشاهده" width={20} height={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllProjects;
