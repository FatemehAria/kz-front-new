import React from "react";
function News() {
  return (
    <div className="bg-[#D0DBEC] h-[400px] mt-[5%] flex flex-col justify-center items-center gap-3 rounded-xl px-[3%] sm:px-0">
      <p className="text-[#334052] sm:text-[40px] max-w-lg text-center text-[30px]">
        با عضویت در خبرنامه شرکت بین المللی کیکاووس زمان از تخفیفات باخبر شوید
      </p>
      <div className="bg-[#F8FAFC] sm:w-[400px] flex flex-row rounded-[6px]">
        <button className="bg-[#B1BED0] w-[100px] py-[2%] rounded-[6px] text-white">
          تایید ایمیل
        </button>
        <input className="outline-none w-full rounded-[6px] px-3" dir="rtl" />
      </div>
    </div>
  );
}

export default News;
