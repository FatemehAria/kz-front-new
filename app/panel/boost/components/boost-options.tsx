import Image from "next/image";
import React from "react";
import BoostPanelItem from "./boost-panel-item";
type BoostOptionsProps = {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
};
const BoostOptions = ({ setSteps }: BoostOptionsProps) => {
  return (
    <div className="grid grid-cols-3 gap-x-[5%] justify-center items-center text-center px-[3%] text-white">
      <div className="cursor-pointer bg-[#7F98F1] rounded-lg flex flex-col h-full pb-2 justify-between">
        <span className="border-b py-2 font-bold">پنل کارفرما</span>
        <BoostPanelItem
          text="بگرد و رایگان استخدام کن"
          imgSrc="/boost-to-employer/1.svg"
        />
        <BoostPanelItem
          text="رایگان استخدامتو برون سپاری کن"
          imgSrc="/boost-to-employer/2.svg"
        />
        <BoostPanelItem
          text="پروژه هاتو رایگان آگهی کن"
          imgSrc="/boost-to-employer/3.svg"
        />
        <button onClick={() => setSteps(2)} className="py-[3%] font-bold">
          ارتقا پنل
        </button>
      </div>

      <div className="cursor-pointer bg-[#7F98F1] rounded-lg flex flex-col h-full pb-2">
        <span className="border-b py-2 font-bold">پنل دانش پژوه</span>
        <BoostPanelItem
          text="ساده و راحت برنامه نویس شو"
          imgSrc="/boost-to-student/1.svg"
        />
        <BoostPanelItem
          text="تو مسیر استخدام کنارتیم"
          imgSrc="/boost-to-student/2.svg"
        />
        <BoostPanelItem
          text="آپدیت مادام العمر و رایگان دوره ها"
          imgSrc="/boost-to-student/3.svg"
        />
        <button className="py-[3%] font-bold">ارتقا پنل</button>
      </div>

      <div className="cursor-pointer bg-[#7F98F1] rounded-lg flex flex-col h-full pb-2">
        <span className="border-b py-2 font-bold">پنل فریلنسر</span>
        <BoostPanelItem
          text="رایگان پروژه ها رو ببین و پیشنهاد بده"
          imgSrc="/boost-to-freelancer/1.svg"
        />
        <BoostPanelItem
          text="منتور های ما تا تحویل پروژه کنارتن"
          imgSrc="/boost-to-freelancer/2.svg"
        />
        <BoostPanelItem
          text="بدون هزینه کمسیون پیشنهاد بده"
          imgSrc="/boost-to-freelancer/3.svg"
        />
        <button className="py-[3%] font-bold">ارتقا پنل</button>
      </div>
    </div>
  );
};

export default BoostOptions;
