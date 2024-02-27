import React from "react";

const JobCard = () => {
  return (
    <div className="flex justify-between border rounded-2xl h-[150px] overflow-hidden lg:w-[80%] p-[2%] mx-auto border-black text-right">
      <div className="flex flex-row lg:w-[45%] justify-between items-center">
        <div className="flex flex-col justify-center items-center text-[#868686]">
          <img
            src="/userpanel/jobtestlogo.svg"
            alt="test"
            className="lg:w-[100px] lg:h-[100px]"
          />
          <span className="font-YekanBakh lg:text-[0.5rem]">
            <span className="font-faNum">3</span>روز پیش
          </span>
        </div>
        <div className="h-full flex flex-col gap-[3%]">
          {/* job position */}
          <p className="font-bold text-[1.25rem] whitespace-nowrap">
            برنامه نویسی فرانت اند
          </p>
          {/* company */}
          <p>شرکت لیان صنعت آرمان</p>
          {/* location */}
          <p>تهران.سعادت آباد</p>
        </div>
      </div>
      <div className="text-left flex justify-start items-end flex-col lg:w-[20%] gap-[20%]">
        <img
          src="/userpanel/jobtestheart.svg"
          alt="test"
          className="lg:w-[45px] lg:h-[45px] w-[20px] h-[20px]"
        />
        <button className="bg-[#4866CF] lg:p-[3%] text-white rounded-2xl whitespace-nowrap text-xs lg:text-base p-[5%]">
          ارسال رزومه
        </button>
      </div>
    </div>
  );
};

export default JobCard;
