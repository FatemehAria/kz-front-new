"use client";
import React, { useEffect, useState } from "react";
import ChecktimeForm from "./components/checktime-form";
import { useSelector } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

type CheckTimeProps = {
  currentDate?: string;
};
const CheckTime = ({ currentDate }: CheckTimeProps) => {
  const { userProfile, localToken } = useSelector(
    (state: any) => state.userRole
  );
  const [checkTime, setCheckTime] = useState({ time_log: "", time_exit: "" });
  // console.log(userProfile.UserType);
  const handleCheckTimeByAdmin = async (
    LastName: string,
    time_log: string,
    time_exit: string
  ) => {
    try {
      const { data } = await axios.post(
        "https://keykavoos.liara.run/Admin/LogAndExit_Admin",
        {
          LastName,
          time_log,
          time_exit,
        },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      toast.success("اطلاعات ثبت شد.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        rtl: true,
      });
      console.log(data);
    } catch (error: any) {
      toast.error("عملیات ناموفق بود.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        rtl: true,
      });
      console.log(error.response.data.message);
    }
  };

  const handleLogSubmission = (time_log: string) => {
    localStorage.setItem("time_log", time_log);
  };

  const handleExitSubmission = (time_exit: string) => {
    localStorage.setItem("time_exit", time_exit);
  };

  const handleFinalSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const time_log = localStorage.getItem("time_log") || "";
    const time_exit = localStorage.getItem("time_exit") || "";
    await handleCheckTimeByAdmin(userProfile.LastName, time_log, time_exit);
  };
  return (
    <div className="w-full px-[3%]">
      {userProfile.UserType === "GeneralAdmin" && (
        <div>
          <div className="flex justify-between items-center my-[2%]">
            <p className="font-semibold text-lg">ثبت ورود / خروج</p>
          </div>
          <div className="px-[3%] py-[2%] bg-[#4866CF1A] rounded-lg w-full text-center">
            <table className="w-full my-2">
              <thead className="border-b-[1px] border-black">
                <tr>
                  <th>نام شرکت</th>
                  <th>شناسه ملی</th>
                  <th>شماره ثبت</th>
                  <th>حوزه فعالیت</th>
                  <th>نحوه آشنایی</th>
                  <th>وضعیت</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-[1px] border-black">
                  <td className="flex justify-center items-center pt-1">
                    1001
                  </td>
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
                  <td></td>
                  <td className="flex justify-center items-center pt-1">
                    <button>
                      <span>❌</span>
                    </button>
                    <button>
                      <span>✔️</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {userProfile.UserType === "Admin" && (
        <form onSubmit={(e) => handleFinalSubmission(e)}>
          <div className="grid grid-cols-1 gap-y-3">
            <p className="flex justify-center">ثبت ورود</p>
            <div className="bg-profileBorderbg p-[5%] grid grid-cols-1 gap-4">
              <div className="flex flex-row justify-between gap-[5%]">
                <div className="flex flex-row items-center w-[50%]">
                  <label className="whitespace-nowrap w-full">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    className="w-full"
                    value={`${userProfile.LastName}`}
                  />
                </div>
                <div className="flex flex-row items-center justify-center gap-5 w-[40%]">
                  <label className="whitespace-nowrap">تاریخ</label>
                  <input type="text" className="w-full" value={currentDate} />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center w-[50%]">
                  <label className="whitespace-nowrap w-full">ساعت ورود</label>
                  <input
                    type="text"
                    className="w-full"
                    onChange={(e) =>
                      setCheckTime((last) => ({
                        ...last,
                        time_log: e.target.value,
                      }))
                    }
                    value={checkTime.time_log}
                  />
                </div>
                <div
                  className="bg-white text-black px-[5%] cursor-pointer"
                  onClick={() => handleLogSubmission(checkTime.time_log)}
                >
                  تایید
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-3">
            <p className="flex justify-center">ثبت خروج</p>
            <div className="bg-profileBorderbg p-[5%] grid grid-cols-1 gap-4">
              <div className="flex flex-row justify-between gap-[5%]">
                <div className="flex flex-row items-center w-[50%]">
                  <label className="whitespace-nowrap w-full">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    className="w-full"
                    value={`${userProfile.LastName}`}
                  />
                </div>
                <div className="flex flex-row items-center justify-center gap-5 w-[40%]">
                  <label className="whitespace-nowrap">تاریخ</label>
                  <input type="text" className="w-full" value={currentDate} />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center w-[50%]">
                  <label className="whitespace-nowrap w-full">ساعت خروج</label>
                  <input
                    type="text"
                    className="w-full"
                    onChange={(e) =>
                      setCheckTime((last) => ({
                        ...last,
                        time_exit: e.target.value,
                      }))
                    }
                    value={checkTime.time_exit}
                  />
                </div>
                <div
                  className="bg-white text-black px-[5%] cursor-pointer"
                  onClick={() => handleExitSubmission(checkTime.time_exit)}
                >
                  تایید
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className=" bg-profileBorderbg rounded-lg px-[1%] py-1 text-black"
            >
              ثبت اطلاعات
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckTime;
