"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Report = () => {
  const { userProfile } = useSelector((state: any) => state.userRole);
  const [showComment, setShowComment] = useState(false);
  return (
    <div className="w-full px-[3%]">
      {userProfile.UserType === "GeneralAdmin" && (
        <div className="px-[3%] py-[2%] bg-[#4866CF1A] rounded-lg w-full text-center">
          <table className="w-full my-2">
            <thead className="border-b-[1px] border-black">
              <tr>
                <th>شماره پرسنلی</th>
                <th>نام و نام خانوادگی</th>
                <th>سمت</th>
                <th>گزارش کار </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-[1px] border-black">
                <td className="flex justify-center items-center pt-1">1001</td>
                <td>ul</td>
                <td>1402/01/02</td>
                <td className="flex flex-row justify-center items-center">
                  <span>مشاهده</span>
                  <span>
                    <Image
                      src="/mainadminpanel/eye.svg"
                      alt="eye"
                      width={15}
                      height={15}
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {userProfile.UserType === "Admin" && (
        <div className="w-full px-[3%]">
          <div>
            <p className="whitespace-nowrap flex justify-center w-[18%]">
              مشاهده وظیفه
            </p>
          </div>
          <div className="flex flex-row gap-[3%]">
            <div className="border border-black rounded-lg p-[3%] px-[2%]">
              Lorem ipsum dolor
            </div>
            <div className="border border-black rounded-lg">
              <p>متن وظیفه...</p>
              <div>
                <div className="flex flex-row justify-between items-center gap-[2%]">
                  <button className="bg-[#9DACDF] w-[100px] rounded-lg py-1 text-center text-white">
                    تایید وظیفه
                  </button>
                  <button
                    className="bg-[#9DACDF] w-[100px] rounded-lg py-1 text-center text-white"
                    onClick={() => setShowComment(true)}
                  >
                    عدم تایید
                  </button>
                </div>
                {showComment && (
                  <div className="bg-[#9DACDF] w-full rounded-lg py-1 text-right text-white mt-[2%] pr-2">
                    <button className="text-[#9DACDF] w-[70px] rounded-lg py-1 text-center bg-white">
                      تایید
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
