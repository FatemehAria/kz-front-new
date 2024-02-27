import Image from "next/image";
import React from "react";

const CompanyInfo = () => {
  return (
    <div className="w-full px-[3%]">
      <div className="flex justify-between items-center my-[2%]">
        <p className="font-semibold text-lg">اطلاعات مسئول شرکت</p>
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
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-[1px] border-black">
              <td className="flex justify-center items-center pt-1">1001</td>
              <td>ul</td>
              <td>1402/01/02</td>
              <td>1</td>
              <td className="flex justify-center">
                <Image
                  src="/mainadminpanel/eye.svg"
                  alt="eye"
                  width={15}
                  height={15}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-around">
          <button>
            <span>تایید</span>
            <span className="bg-white">✔️</span>
          </button>
          <button>
            <span>عدم تایید</span>
            <span className="bg-white">❌</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
