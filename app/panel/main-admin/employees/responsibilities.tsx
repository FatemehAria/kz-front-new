import Image from "next/image";
import React from "react";

const Responsibilities = () => {
  return (
    <div className="w-[90%] mx-auto px-[5%] text-center">
      <div className="flex justify-between items-center mb-[2%]">
        <p className="font-semibold text-xl">وظایف موردنظر مدیرعامل از کارمندان</p>
        <button className="bg-[#9DACDF] text-white px-[2%] py-[1%] flex justify-center items-center text-center rounded-lg">+ ایجاد وظیفه</button>
      </div>
      <div className="bg-profileBorderbg">
        <div className="w-full px-[3%] py-[2%]">
          <table className="w-full text-center">
            <thead className="border-b border-black">
              <tr>
                <th>شماره پرسنلی</th>
                <th>نام و نام خانوادگی</th>
                <th>سمت</th>
                <th>شرح وظایف</th>
                <th>تخصیص وظیفه جدید</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="flex justify-around items-center pt-1">1001</td>
                <td>حمید بخشی</td>
                <td>گرافیست</td>
                <td className="flex flex-row justify-center">
                  <span>مشاهده</span>
                  <Image
                    src="/mainadminpanel/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                  />
                </td>
                <td>+ایجاد وظیفه</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Responsibilities;
