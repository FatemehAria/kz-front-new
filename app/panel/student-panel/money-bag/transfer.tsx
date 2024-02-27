import Image from "next/image";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const Transfer = () => {
  return (
    <div className="rounded-xl grid grid-cols-1 justify-center lg:bg-profileBorderbg p-[2%]">
      <div className="rounded-lg grid grid-cols-3 gap-x-[2%] text-center">
        <div className="col-span-2">
          <p className="flex flex-row w-full rounded-lg justify-between p-[2%] bg-white font-semibold">
            <span>موجودی کیف پول</span>
            <span>مبلغ</span>
          </p>
          <div className="w-full my-2 bg-white rounded-lg p-[2%]">
            <table className="w-full">
              <thead className="border-b-[1px] border-black">
                <tr>
                  <th>مبلغ</th>
                  <th>تاریخ</th>
                  <th>شماره</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-[1px] border-black">
                  <td>9،900،000</td>
                  <td>1399/10/11</td>
                  <td>1234</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-1 bg-white rounded-lg p-[2%] flex flex-col gap-5">
          <div className="bg-profileBorderbg p-[3%]">
            <div className="text-[#FF0000] font-extrabold text-2xl flex justify-end">
              <RxCross2 />
            </div>
            <div className="flex flex-row items-center justify-between border-b border-b-black rounded-lg cursor-pointer">
              <p className="font-semibold">انتقال موجودی</p>
              <Image
                src="/studentpanel/transfer.svg"
                alt="transfer"
                width={50}
                height={50}
              />
            </div>

            <div className="border border-black bg-white my-2 rounded-lg py-1">
              مبلغ
            </div>

            <div className="flex flex-row justify-between w-full my-2">
              <div className="relative w-full">
                <input
                  className="mx-auto outline-none rounded-md px-2 py-3 w-full"
                  placeholder="تلفن همراه دریافت کننده"
                  type="text"
                  // onChange={onChange}
                  maxLength={11}
                  // value={value}
                  required
                />
              </div>
            </div>

            <button className="bg-white w-[80%] border border-black rounded-lg py-1">
              درخواست انتقال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
