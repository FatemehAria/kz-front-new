import React from "react";
const SearchProjectData = [
  {
    id: 1,
    title: "پروژه یک",
    title1: "پروژه یک",
    title2: "پروژه یک",
    title3: "پروژه یک",
    imgSrc: "vieweye",
  },
  {
    id: 2,
    title: "پروژه یک",
    title1: "پروژه یک",
    title2: "پروژه یک",
    title3: "پروژه یک",
    imgSrc: "vieweye",
  },
];
function SearchProject() {
  return (
    <div className="flex flex-col gap-5 bg-white shadow mx-auto rounded-2xl w-full p-[3%]">
      <div className="grid grid-cols-5 text-center">
        <p>ردیف</p>
        <p>عنوان پروژه</p>
        <p>وضعیت پیشرفت پروژه</p>
        <p>وضعیت مالی پروژه</p>
        <p>درخواست فاکتور</p>
      </div>
      {SearchProjectData.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
          //   onClick={() => setStep(2)}
        >
          <p>{item.title}</p>
          <p>{item.title1}</p>
          <p>{item.title2}</p>
          <p>{item.title3}</p>
          <p>{item.imgSrc}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchProject;
