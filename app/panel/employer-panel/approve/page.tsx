"use client";
import { Dispatch, SetStateAction } from "react";
import { ImCross } from "react-icons/im";

type ApproveProps = {
  setSteps: Dispatch<SetStateAction<number>>;
};
const Approve = ({ setSteps }: ApproveProps) => {
  return (
    <div
      className="w-[95%] mx-auto rounded-lg bg-[#4866CF] font-YekanBakh my-4"
      style={{ boxShadow: "0px 4px 25px 4px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-white w-[700px] h-full rounded-lg">
        <div className="w-[90%] mx-auto py-4">
          <div className="flex justify-between py-2">
            <p className="font-bold text-lg">تایید مصاحبه</p>
            <span className="text-red-600">
              <ImCross />
            </span>
          </div>
          <p className="font-bold my-4">
            کارفرمای محترم لطفا زمان و تاریخ مصاحبه را تعیین کنید:
          </p>
          <table
            className="w-[500px] rounded-lg mx-auto text-center mb-10"
            style={{ boxShadow: "0px 7px 18px 1px rgba(0, 0, 0, 0.25)" }}
          >
            <thead>
              <tr className="">
                <th className="border-b border-l border-black py-2">شنبه</th>
                <th className="border-b border-l border-black py-2">یکشنبه</th>
                <th className="border-b border-l border-black py-2">دوشنبه</th>
                <th className="border-b border-black py-2">سه شنبه</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-l border-black py-2">10:00</td>
                <td className="border-l border-black py-2">10:00</td>
                <td className="border-l border-black py-2">10:00</td>
                <td>10:00</td>
              </tr>
              <tr>
                <td className="border-l border-black py-2">10:00</td>
                <td className="border-l border-black py-2">10:00</td>
                <td className="border-l border-black py-2">10:00</td>
                <td>10:00</td>
              </tr>
              <tr>
                <td className="border-l border-black py-2">10:00</td>
                <td className="border-l border-black py-2">10:00</td>
                <td className="border-l border-black py-2">10:00</td>
                <td>10:00</td>
              </tr>
            </tbody>
          </table>

          <p className="font-bold text-lg">
            به شماره تماس شما یک کد تایید ارسال شد.
          </p>
          <p className="text-[#7F98F1] py-4">ویرایش شماره</p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="شماره همراه"
              className="border w-[60%] p-3 rounded-md"
            />
            <div className="flex items-center gap-24">
              <span className="text-[#4866CF]">1:30 دقیقه تا ارسال مجدد.</span>
              <button
                className="bg-[#4866CF] rounded-[44px] text-white w-[100px] py-2"
                onClick={() => setSteps(4)}
              >
                <span>تایید کد تایید</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Approve;
