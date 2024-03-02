import React from "react";
import tower from "../../public/intro/tower.svg";
import play from "../../public/intro/play.svg";
import support from "../../public/intro/support.svg";
import Image from "next/image";

function Intro() {
  return (
    <div className="grid grid-cols-2 text-right relative">
      <div
        style={{
          width: "420px",
          maxWidth: "450px",
          height: "420px",
          background: "radial-gradient(circle at bottom,#F6FCFA 99%,#0000)",
          borderRadius: "50% 50% 50% 50%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image src={tower} alt="tower" />
        <div className="bg-[#FFFFFF] w-[100px] h-[100px] rounded-[5px] absolute left-0 top-14 flex flex-col items-center py-3 gap-1 shadow">
          <Image
            src={support}
            alt="support"
            width={25}
            height={25}
            className="bg-[#C9D6E9DE] p-[3%] rounded-full"
          />
          <p className="text-[12px] text-[#4C6487]">پشتیبانی یک ساله</p>
          <p className="text-[10px] text-[#4C6487] text-center">
            یک سال در کنارتان هستیم
          </p>
        </div>

        <div className="w-[30px] h-[30px] absolute left-12 bg-[#C9D6E9] rounded-full"></div>
        <div className="w-[18px] h-[18px] absolute left-[28rem] top-12 bg-[#C9D6E9] rounded-full"></div>
        <div className="w-[22px] h-[22px] absolute bottom-5 left-2 bg-[#C9D6E9] rounded-full"></div>
        <div className="w-[8px] h-[8px] absolute bottom-11 right-80 bg-[#C9D6E9] rounded-full"></div>
      </div>

      <div className="flex flex-col justify-center items-end gap-5">
        <div className="flex items-center justify-center text-[#68707A] text-[45px]">
          <div>
            شرکت بین المللی <span className="font-extrabold">کیکاووس زمان</span>{" "}
            پیشرو در زمینه <p>برنامه نویسی</p>
          </div>
        </div>
        <p className="text-[#939393] max-w-sm text-[16px]">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
        </p>
        <div className="flex justify-end gap-3">
          <button className="flex flex-row items-center h-[40px] w-[145px] rounded-[4px] text-[#597193]">
            <Image src={play} alt="play" width={40} height={40} />
            <span>تماشا ویدیو</span>
          </button>
          <button className="bg-[#4866CF] text-white h-[40px] w-[135px] rounded-[4px]">
            ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
{
  /* <div className="flex justify-center items-end bg-blue-100">
        <div className="w-[500px] h-[500px] bg-white rounded-full"></div>
        <Image src={tower} alt="tower" className="relative -left-[50%]" />
      </div> */
}
