import React from "react";

function LegalUsers() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-5 text-center">
        <p>ردیف</p>
        <p>شماره موبایل</p>
        <p>نام و نام خانوادگی</p>
        <p>ایمیل</p>
        <p>مشاهده</p>
      </div>
      {/* {AllProjectsData.map((item) => (
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
      ))} */}
    </div>
  );
}

export default LegalUsers;
