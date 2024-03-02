import React from "react";
import tower from "../../public/intro/tower.svg";
import play from "../../public/intro/play.svg";
import Image from "next/image";

function Intro() {
  return (
    <div className="grid grid-cols-2 text-right">
      <div
        style={{
          width: "420px",
          maxWidth: "450px",
          height: "420px",
          background: "radial-gradient(circle closest-side,white 99%,#0000)",
          borderRadius: "0 0 50% 50%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <Image src={tower} alt="tower" className="mx-auto" />
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center justify-center text-[#68707A] text-[45px]">
          <p>
            شرکت بین المللی <span className="font-extrabold">کیکاووس زمان</span>{" "}
            پیشرو در زمینه برنامه نویسی
          </p>
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
