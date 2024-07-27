"use client";
import React, { useState } from "react";
import TicketFields from "../support/add-new-placard/components/ticket-fields";

function NewsLetter() {
  const [newsletterInfo, setNewsLetteInfo] = useState({
    relativeUnit: "",
    newsText: "",
  });
  return (
    <div className="flex flex-col gap-5 bg-white shadow mx-auto rounded-2xl w-full p-[3%]">
      <p>ایجاد خبرنامه جدید</p>
      <TicketFields
        label="واحد مربوطه:"
        width="30%"
        value={newsletterInfo.relativeUnit}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewsLetteInfo((last) => ({
            ...last,
            relativeUnit: e.target.value,
          }))
        }
        direction="flex-row items-center"
      />
      <div
        style={{
          border: "none",
          borderTop: "3px solid",
          borderImage:
            "linear-gradient(to right, #FFFFFF 0%, #4866CE 45% ,#4866CE 55% , #FFFFFF 100%) 1",
          margin: "3% 0",
        }}
      ></div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          <label htmlFor="">متن خبرنامه:</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="p-2 bg-[#EAEFF6] w-[30%] rounded-[4px]"
            value={newsletterInfo.newsText}
            onChange={(e) =>
              setNewsLetteInfo((last) => ({
                ...last,
                newsText: e.target.value,
              }))
            }
          ></textarea>
        </div>
      </div>

      <div className="flex items-center justify-end gap-5">
        <button className="bg-[#4866CE] text-white p-2 rounded-[4px]">ارسال خبرنامه</button>
        <button className="bg-[#ffffff] text-[#4866CE] border border-[#4866CE] p-2 rounded-[4px]">لغو ارسال</button>
      </div>
    </div>
  );
}

export default NewsLetter;
