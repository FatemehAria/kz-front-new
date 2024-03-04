import React from "react";
type AllProjectsProps = {
  AllProjectsData: SingleProjectInfo[];
  setStep: React.Dispatch<React.SetStateAction<number>>
};
type SingleProjectInfo = {
  id: number;
  title: string;
  title1: string;
  title2: string;
  title3: string;
  title4: string;
};
function AllProjects({ AllProjectsData , setStep}: AllProjectsProps) {
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
        <div
          key={item.id}
          className="grid grid-cols-5 text-center py-1 bg-[#EAEFF6] rounded-[4px] cursor-pointer"
          onClick={() => setStep(2)}
        >
          <p>{item.title}</p>
          <p>{item.title1}</p>
          <p>{item.title2}</p>
          <p>{item.title3}</p>
          <p>{item.title4}</p>
        </div>
      ))}
    </div>
  );
}

export default AllProjects;
