"use client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
type PersonProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const Person = ({ setSteps }: PersonProps) => {
  const [adValidation, setAdValidation] = useState(50);
  const [jobValidation, setJobValidation] = useState(40);

  const copyLink = () => {
    const link = "https://www.example.com"; // replace with your desired link
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Link copied successfully.");
      })
      .catch(() => {
        console.log("Failed to copy link.");
      });
  };

  return (
    <div className="font-YekanBakh w-[90%] mx-auto my-2">
      {/* info */}
      <div className="flex justify-between items-center p-3 border border-black rounded-lg font-bold my-4">
        <div className="flex items-center gap-3">
          <Image
            src="/employerpanel/adtitleicon.svg"
            alt="icon"
            width={25}
            height={25}
          />
          <span>حمیدرضا بخشی</span>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/employerpanel/adtitleicon.svg"
            alt="icon"
            width={25}
            height={25}
          />
          <span className="font-faNum">شماره کاربری #1254</span>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/employerpanel/adtitleicon.svg"
            alt="icon"
            width={25}
            height={25}
          />
          <span className="font-faNum">آخرین بازدید 8ساعت پیش</span>
        </div>
      </div>
      {/* others */}
      <div className="grid grid-cols-7">
        <div className="col-span-5 w-[95%] h-[600px] bg-[#D9D9D9]"></div>
        {/* validation */}
        <div className="col-span-2 border border-black rounded-lg font-bold text-center flex flex-col gap-3 items-center">
          <p className="my-4">انطباق آگهی</p>
          <div className="h-[40px] w-[90%] mx-auto border border-black rounded-lg font-faNum relative">
            <div
              className={`bg-[#4866CF] h-full rounded-lg absolute top-0 left-0`}
              style={{ width: `${adValidation}%` }}
            ></div>
            <div className="absolute -top-[80%] left-0 w-full h-full flex items-center justify-between">
              <span className="">100</span>
              <span
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                style={{ left: `calc(${adValidation}% - 55%)` }}
              >
                {adValidation}
              </span>
              <span className="">0</span>
            </div>
          </div>

          <p className="my-4">انطباق حرفه ای</p>
          <div className="h-[40px] w-[90%] mx-auto border border-black rounded-lg font-faNum relative">
            <div
              className={`bg-[#4866CF] h-full rounded-lg absolute top-0 left-0`}
              style={{ width: `${jobValidation}%` }}
            ></div>
            <div className="absolute -top-[80%] left-0 w-full h-full flex items-center justify-between">
              <span className="">100</span>
              <span
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                style={{ left: `calc(${jobValidation}% - 55%)` }}
              >
                {jobValidation}
              </span>
              <span className="">0</span>
            </div>
          </div>

          {/* note */}
          <div className="flex flex-col gap-3 justify-center items-center w-[90%]">
            <p>یادداشت کارجو</p>
            <input
              type="text"
              className="border border-black rounded-lg w-full h-[200px]"
            />
          </div>

          {/* options */}
          <div className="flex flex-row justify-between border border-black rounded-lg px-[3%] w-[90%] py-1 cursor-pointer">
            <span onClick={() => setSteps(3)}>تایید برای مصاحبه</span>
            <Image
              src="/employerpanel/recieved.svg"
              alt="approve"
              width={20}
              height={20}
            />
          </div>
          <p className="flex flex-row justify-between border border-black rounded-lg px-[3%] w-[90%] py-1">
            <span>نامناسب (گزارش)</span>
            <Image
              src="/employerpanel/rejected.svg"
              alt="approve"
              width={20}
              height={20}
            />
          </p>
          <p className="flex flex-row justify-between border border-black rounded-lg px-[3%] w-[90%] py-1">
            <span>نیاز به بازنگری</span>
            <Image
              src="/employerpanel/inhands.svg"
              alt="approve"
              width={20}
              height={20}
            />
          </p>

          {/* sharing */}
          <div className="flex flex-col border border-black rounded-lg w-[90%] mb-2 gap-1">
            <div className="flex items-center justify-between border-b-2 border-black px-1">
              <p>اشتراک گذاری</p>
              <Image
                src="/employerpanel/share.svg"
                alt="share"
                width={20}
                height={20}
              />
            </div>
            <div className="flex items-center justify-between border-b-2 border-black px-1">
              <p>پیامرسان واتساپ</p>
              <Image
                src="/employerpanel/whatsapp.svg"
                alt="share"
                width={20}
                height={20}
              />
            </div>
            <div className="flex items-center justify-between border-b-2 border-black px-1">
              <p>پیامرسان تلگرام</p>
              <Image
                src="/employerpanel/telegram.svg"
                alt="share"
                width={20}
                height={20}
              />
            </div>
            <div className="flex items-center justify-between border-b-2 border-black px-1">
              <p>پیامرسان بله</p>
              <Image
                src="/employerpanel/bale.svg"
                alt="share"
                width={20}
                height={20}
              />
            </div>
            <div className="flex items-center justify-between px-1">
              <p className="cursor-pointer" onClick={() => copyLink()}>
                کپی لینک
              </p>
              <Image
                src="/employerpanel/link.svg"
                alt="share"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => copyLink()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Person;
